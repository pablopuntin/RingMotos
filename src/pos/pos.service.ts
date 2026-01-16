// import {
//   Injectable,
//   ConflictException,
// } from '@nestjs/common';
// import { SalesService } from 'src/sale/sale.service';
// import { PaymentService } from 'src/payment/payment.service';
// import { PosSaleActionDto } from './dto/pos-sale-action.dto';
// import { AccountEntryService } from 'src/acount-entry/acount-entry.service';

// @Injectable()
// export class PosService {
//   constructor(
//     private readonly salesService: SalesService,
//     private readonly paymentService: PaymentService,
//     private readonly accountEntryService: AccountEntryService,
//   ) {}

//   async handleSaleAction(
//     saleId: string,
//     dto: PosSaleActionDto,
//     user: any,
//   ) {
//     // 1️⃣ Confirmar venta
//     const sale = await this.salesService.confirm(saleId);

//     // 2️⃣ Cargo en cuenta corriente
//     await this.accountEntryService.createChargeForSale(sale);

//     // 3️⃣ Pago (si corresponde)
//     if (dto.action === 'PAY') {
//       if (!dto.amount || dto.amount < 0) {
//         throw new ConflictException('Monto inválido');
//       }

//       if (!dto.paymentMethod) {
//         throw new ConflictException(
//           'paymentMethod es obligatorio',
//         );
//       }

   
//     await this.paymentService.create(
//   {
//     amount: dto.amount,
//     paymentMethod: dto.paymentMethod,
//     allocations: [
//       { saleId: sale.id, amount: dto.amount },
//     ],
//   },
//   user.id, // userId separado como segundo argumento
// );
//     }

//     // 4️⃣ Volver a leer la venta COMPLETA
//     const fullSale = await this.salesService.findOne(sale.id);

//     if (!fullSale) {
//       throw new ConflictException(
//         'No se pudo obtener la venta',
//       );
//     }

//     // 5️⃣ Calcular resumen (SOLO FORMATO)
//     const entrega =
//       fullSale.paymentAllocations?.reduce(
//         (sum, p) => sum + Number(p.amountApplied),
//         0,
//       ) ?? 0;

//     const saldoVenta =
//       Number(fullSale.totalAmount) - entrega;

//     const saldoTotal =
//       await this.accountEntryService.getLastBalance(
//         fullSale.client.id,
//       );

//     const saldoAnterior =
//       saldoTotal - Number(saldoVenta);

//     // 6️⃣ JSON largo (el que pediste)
//     return {
//       id: fullSale.id,
//       client: {
//         id: fullSale.client.id,
//         name: `${fullSale.client.name} ${fullSale.client.lastName}`,
//         totalDebtCache:
//           fullSale.client.totalDebtCache,
//       },
//       status: fullSale.status,
//       totalAmount: fullSale.totalAmount,
//       paidAmount: fullSale.paidAmount,
//       items: fullSale.items,
//       paymentAllocations:
//         fullSale.paymentAllocations ?? [],
//       summary: {
//         entrega: entrega.toFixed(2),
//         saldoVenta: saldoVenta.toFixed(2),
//         saldoAnterior:
//           saldoAnterior.toFixed(2),
//         saldoTotal: saldoTotal.toFixed(2),
//       },
//     };
//   }
// }

//ref
import {
  Injectable,
  ConflictException,
} from '@nestjs/common';
import { SalesService } from 'src/sale/sale.service';
import { PaymentService } from 'src/payment/payment.service';
import { PosSaleActionDto } from './dto/pos-sale-action.dto';
import { AccountEntryService } from 'src/acount-entry/acount-entry.service';

@Injectable()
export class PosService {
  constructor(
    private readonly salesService: SalesService,
    private readonly paymentService: PaymentService,
    private readonly accountEntryService: AccountEntryService,
  ) {}

  async handleSaleAction(
    saleId: string,
    dto: PosSaleActionDto,
    user: any,
  ) {
    // ─────────────────────────────
    // 1️⃣ Confirmar venta
    // ─────────────────────────────
    const sale = await this.salesService.confirm(saleId);

    const isFinalConsumer = sale.client.isFinalConsumer;
    const totalAmount = Number(sale.totalAmount);

    // 🚫 BLOQUEO #1 — Consumidor Final NO puede confirmar sin pagar
if (isFinalConsumer && dto.action === 'NO_PAYMENT') {
  throw new ConflictException(
    'Consumidor Final no puede confirmar sin pago',
  );
}

    // ─────────────────────────────
    // 2️⃣ Cargo en cuenta corriente (SOLO si no es Consumidor Final)
    // ─────────────────────────────
    if (!isFinalConsumer) {
      await this.accountEntryService.createChargeForSale(sale);
    }

    // ─────────────────────────────
    // 3️⃣ Pago (si corresponde)
    // ─────────────────────────────
    if (dto.action === 'PAY') {
      const amount = Number(dto.amount);

      if (!dto.amount || amount < 0) {
        throw new ConflictException('Monto inválido');
      }

      if (!dto.paymentMethod) {
        throw new ConflictException(
          'paymentMethod es obligatorio',
        );
      }

      // 🔥 Regla clave: Consumidor Final paga el TOTAL
      if (isFinalConsumer && amount !== totalAmount) {
        throw new ConflictException(
          'Consumidor Final debe pagar el total de la factura',
        );
      }

      await this.paymentService.create(
        {
          amount,
          paymentMethod: dto.paymentMethod,
          allocations: [
            { saleId: sale.id, amount },
          ],
        },
        user.id,
      );
    }

    // ─────────────────────────────
    // 4️⃣ Volver a leer la venta COMPLETA
    // ─────────────────────────────
    const fullSale = await this.salesService.findOne(sale.id);

    if (!fullSale) {
      throw new ConflictException(
        'No se pudo obtener la venta',
      );
    }

    // ─────────────────────────────
    // 5️⃣ Cálculos de resumen (extraídos a variables claras)
    // ─────────────────────────────
    const entrega = 
      fullSale.paymentAllocations?.reduce(
        (sum, p) => sum + Number(p.amountApplied),
        0,
      ) ?? 0;

    const saldoVenta = Number(fullSale.totalAmount) - entrega;

    const saldoTotal =
      await this.accountEntryService.getLastBalance(
        fullSale.client.id,
      );

    const saldoAnterior = saldoTotal - saldoVenta;

    // ─────────────────────────────
    // 6️⃣ Respuesta final (más limpia)
    // ─────────────────────────────
    return {
      id: fullSale.id,
      client: {
        id: fullSale.client.id,
        name: `${fullSale.client.name} ${fullSale.client.lastName}`,
        totalDebtCache: fullSale.client.totalDebtCache,
      },
      status: fullSale.status,
      totalAmount: fullSale.totalAmount,
      paidAmount: fullSale.paidAmount,
      items: fullSale.items,
      paymentAllocations: fullSale.paymentAllocations ?? [],
      summary: {
        entrega: entrega.toFixed(2),
        saldoVenta: saldoVenta.toFixed(2),
        saldoAnterior: saldoAnterior.toFixed(2),
        saldoTotal: saldoTotal.toFixed(2),
      },
    };
  }
}
