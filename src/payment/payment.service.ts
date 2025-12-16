import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { Sale } from 'src/sale/entities/sale.entity';
import { PaymentAllocation } from 'src/payment-allocation/entities/payment-allocation.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { CashMovement } from 'src/cash-movement/entities/cash-movement.entity';
import { AccountEntry } from 'src/acount-entry/entities/acount-entry.entity';


@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,

    @InjectRepository(Sale)
    private readonly saleRepo: Repository<Sale>,

    @InjectRepository(PaymentAllocation)
    private readonly allocationRepo: Repository<PaymentAllocation>,

    private readonly dataSource: DataSource,
  ) {}

//   async create(dto: CreatePaymentDto) {
//     return this.dataSource.transaction(async manager => {
//       const payment = manager.create(Payment, {
//         amount: dto.amount,
//         paymentMethod: dto.paymentMethod,
//         receivedBy: dto.receivedBy,
//         cashRegisterId: dto.cashRegisterId,
//         paymentDate: new Date(),
//         status: 'COMPLETED',
//       });

//       await manager.save(payment);

//       let remaining = dto.amount;

//       for (const alloc of dto.allocations) {
//         const sale = await manager.findOne(Sale, {
//           where: { id: alloc.saleId },
//         });

//         if (!sale) throw new NotFoundException('Venta no encontrada');

//         if (sale.status === 'CANCELLED') {
//           throw new ConflictException('No se puede pagar una venta cancelada');
//         }

//         const allocation = manager.create(PaymentAllocation, {
//           payment,
//           sale,
//           amountApplied: alloc.amount,
//         });

//         await manager.save(allocation);

//         sale.paidAmount += alloc.amount;
//         sale.status =
//           sale.paidAmount >= sale.totalAmount
//             ? 'PAID'
//             : 'PAID_PARTIAL';

//         await manager.save(sale);

//         remaining -= alloc.amount;
//       }

//       if (remaining !== 0) {
//         throw new ConflictException('El pago no fue completamente asignado');
//       }

//       // 🔴 ACÁ VA:
//       // - cash_movement IN
//       // - account_entry PAYMENT

//       return payment;
//     });
//   }
// }

async create(dto: CreatePaymentDto) {
  return this.dataSource.transaction(async manager => {

    /* =====================
       Crear pago
    ====================== */
    const payment = manager.create(Payment, {
      amount: dto.amount,
      paymentMethod: dto.paymentMethod,
      receivedBy: dto.receivedBy,
      cashRegisterId: dto.cashRegisterId,
      paymentDate: new Date(),
      status: 'COMPLETED',
    });

    await manager.save(payment);

    let remaining = dto.amount;
    let client: any = null;

    /* =====================
       Asignar a ventas
    ====================== */
    for (const alloc of dto.allocations) {
      const sale = await manager.findOne(Sale, {
        where: { id: alloc.saleId },
        relations: ['client'],
      });

      if (!sale) {
        throw new NotFoundException('Venta no encontrada');
      }

      if (sale.status === 'CANCELLED') {
        throw new ConflictException(
          'No se puede pagar una venta cancelada',
        );
      }

      if (alloc.amount <= 0) {
        throw new ConflictException('Monto inválido');
      }

      const allocation = manager.create(PaymentAllocation, {
        payment,
        sale,
        amountApplied: alloc.amount,
      });

      await manager.save(allocation);

      sale.paidAmount += alloc.amount;
      sale.status =
        sale.paidAmount >= sale.totalAmount
          ? 'PAID'
          : 'PAID_PARTIAL';

      await manager.save(sale);

      remaining -= alloc.amount;
      client = sale.client;
    }

    if (remaining !== 0) {
      throw new ConflictException(
        'El pago no fue completamente asignado',
      );
    }

    /* =====================
       Movimiento de caja
    ====================== */
    await manager.save(
      manager.create(CashMovement, {
        cashRegister: { id: dto.cashRegisterId },
        type: 'IN',
        amount: dto.amount,
        reason: 'Pago de cliente',
        relatedPaymentId: payment.id,
      }),
    );

    /* =====================
       Cuenta corriente
    ====================== */
    if (client) {
      const lastEntry = await manager.findOne(AccountEntry, {
        where: { client: { id: client.id } },
        order: { createdAt: 'DESC' },
      });

      const previousBalance = lastEntry?.balanceAfter ?? 0;
      const newBalance = previousBalance - dto.amount;

      await manager.save(
        manager.create(AccountEntry, {
          client,
          type: 'PAYMENT',
          payment,
          amount: -dto.amount,
          balanceAfter: newBalance,
          description: 'Pago recibido',
          status: 'ACTIVE',
        }),
      );

      // opcional cache
      client.totalDebtCache = newBalance;
      await manager.save(client);
    }

    return payment;
  });
}
}