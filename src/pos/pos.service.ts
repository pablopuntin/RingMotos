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
//     private readonly accountEntryService: AccountEntryService,  // <--- inyectar aquí
//   ) {}

//   async handleSaleAction(
//     saleId: string,
//     dto: PosSaleActionDto,
//   ) {
//     // Confirmar venta siempre
//     const sale = await this.salesService.confirm(saleId);

//     // Crear cargo en cuenta corriente por la venta confirmada
//     await this.accountEntryService.createChargeForSale(sale);

//     switch (dto.action) {
//       case 'NO_PAYMENT':
//         return sale;

//       case 'PAY':
//         if (!dto.amount || dto.amount <= 0) {
//           throw new ConflictException('Monto inválido');
//         }

//         if (!dto.paymentMethod || !dto.receivedBy) {
//           throw new ConflictException(
//             'paymentMethod y receivedBy son obligatorios',
//           );
//         }

//         await this.paymentService.create({
//           amount: dto.amount,
//           paymentMethod: dto.paymentMethod,
//           receivedBy: dto.receivedBy,
//           allocations: [
//             {
//               saleId: sale.id,
//               amount: dto.amount,
//             },
//           ],
//         });

//         return this.salesService.findOne(sale.id);
//     }
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
) {
  // 1️⃣ Confirmar venta
  const sale = await this.salesService.confirm(saleId);

  // 2️⃣ Cargo en cuenta corriente
  await this.accountEntryService.createChargeForSale(sale);

  // 3️⃣ Pago (si corresponde)
  if (dto.action === 'PAY') {
    if (!dto.amount || dto.amount <= 0) {
      throw new ConflictException('Monto inválido');
    }

    if (!dto.paymentMethod || !dto.receivedBy) {
      throw new ConflictException(
        'paymentMethod y receivedBy son obligatorios',
      );
    }

    await this.paymentService.create({
      amount: dto.amount,
      paymentMethod: dto.paymentMethod,
      receivedBy: dto.receivedBy,
      allocations: [
        { saleId: sale.id, amount: dto.amount },
      ],
    });
  }

  // 4️⃣ Volver a leer la venta COMPLETA
  const fullSale = await this.salesService.findOne(sale.id);

  if (!fullSale) {
    throw new ConflictException('No se pudo obtener la venta');
  }

  // 5️⃣ Calcular resumen (SOLO FORMATO)
  const entrega = fullSale.paymentAllocations
    ?.reduce(
      (sum, p) => sum + Number(p.amountApplied),
      0,
    ) ?? 0;

  const saldoVenta =
    Number(fullSale.totalAmount) - entrega;

  // const saldoTotal =
  //   Number(fullSale.client.totalDebtCache);

  // const saldoAnterior =
  //   saldoTotal - saldoVenta;

  //ref
  const saldoTotal =
  await this.accountEntryService.getLastBalance(
    fullSale.client.id,
  );

const saldoAnterior =
  saldoTotal - Number(saldoVenta);


  // 6️⃣ JSON largo (el que pediste)
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