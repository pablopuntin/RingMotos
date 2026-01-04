// import {
//   Injectable,
//   NotFoundException,
//   ConflictException,
//   BadRequestException,
// } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository, DataSource } from 'typeorm';
// import { Payment } from './entities/payment.entity';
// import { Sale } from 'src/sale/entities/sale.entity';
// import { PaymentAllocation } from 'src/payment-allocation/entities/payment-allocation.entity';
// import { CreatePaymentDto } from './dto/create-payment.dto';
// import { CashMovement } from 'src/cash-movement/entities/cash-movement.entity';
// import { AccountEntry } from 'src/acount-entry/entities/acount-entry.entity';
// import { CashRegister } from 'src/cash-register/entities/cash-register.entity';
// import { Client } from 'src/client/entities/client.entity';
// import { CreateDirectPaymentDto } from './dto/create-direct-payment.dto';

// @Injectable()
// export class PaymentService {
//   constructor(
//     @InjectRepository(Payment)
//     private readonly paymentRepo: Repository<Payment>,

//     @InjectRepository(Sale)
//     private readonly saleRepo: Repository<Sale>,

//     @InjectRepository(PaymentAllocation)
//     private readonly allocationRepo: Repository<PaymentAllocation>,

//     private readonly dataSource: DataSource,
//   ) {}

//   async create(dto: CreatePaymentDto) {
//     if (dto.amount <= 0) {
//       throw new BadRequestException('El monto debe ser mayor a 0');
//     }

//     return this.dataSource.transaction(async manager => {
//       /* =====================
//          Caja (auto)
//       ====================== */
//       let cash = await manager.findOne(CashRegister, {
//         where: { openedBy: dto.receivedBy, status: 'OPEN' },
//       });

//       if (!cash) {
//         cash = manager.create(CashRegister, {
//           name: `Caja automática ${dto.receivedBy}`,
//           openingAmount: 0,
//           status: 'OPEN',
//           openedBy: dto.receivedBy,
//           openedAt: new Date(),
//         });
//         await manager.save(cash);

//         await manager.save(
//           manager.create(CashMovement, {
//             cashRegister: cash,
//             type: 'IN',
//             amount: 0,
//             reason: 'Apertura automática de caja',
//           }),
//         );
//       }

//       /* =====================
//          Pago
//       ====================== */
//       const payment = manager.create(Payment, {
//         amount: dto.amount,
//         paymentMethod: dto.paymentMethod,
//         receivedBy: dto.receivedBy,
//         cashRegisterId: cash.id,
//         paymentDate: new Date(),
//         status: 'COMPLETED',
//       });
//       await manager.save(payment);

//       let remaining = dto.amount;
//       const touchedSales: Sale[] = [];

//       /* =====================
//          Allocations
//       ====================== */
//       for (const alloc of dto.allocations) {
//         if (alloc.amount <= 0) {
//           throw new ConflictException('Monto inválido');
//         }

//         const sale = await manager.findOne(Sale, {
//           where: { id: alloc.saleId },
//           relations: ['client'],
//         });

//         if (!sale) throw new NotFoundException('Venta no encontrada');
//         if (sale.status === 'CANCELLED') {
//           throw new ConflictException('No se puede pagar una venta cancelada');
//         }
//         if (sale.status === 'DRAFT') {
//           throw new ConflictException('La venta debe estar confirmada');
//         }

//         const remainingSaleBalance =
//           Number(sale.totalAmount) - Number(sale.paidAmount);

//         if (alloc.amount > remainingSaleBalance) {
//           throw new ConflictException(
//             'El monto supera el saldo pendiente de la venta',
//           );
//         }

//         await manager.save(
//           manager.create(PaymentAllocation, {
//             payment,
//             sale,
//             amountApplied: alloc.amount,
//           }),
//         );

//         // sale.paidAmount += alloc.amount;
//         sale.paidAmount =
//   Number(sale.paidAmount) + Number(alloc.amount);

//         sale.status =
//           sale.paidAmount >= sale.totalAmount ? 'PAID' : 'PAID_PARTIAL';

//         await manager.save(sale);

//         remaining -= alloc.amount;
//         touchedSales.push(sale);
//       }

//       if (remaining !== 0) {
//         throw new ConflictException('El pago no fue completamente asignado');
//       }

//       /* =====================
//          Movimiento de caja
//       ====================== */
//       await manager.save(
//         manager.create(CashMovement, {
//           cashRegister: cash,
//           type: 'IN',
//           amount: dto.amount,
//           reason: 'Pago de cliente',
//           relatedPaymentId: payment.id,
//         }),
//       );

//       /* =====================
//          Cuenta corriente
//       ====================== */
//       const client = touchedSales[0]?.client;
//       if (client) {
//         const lastEntry = await manager.findOne(AccountEntry, {
//           where: { client: { id: client.id } },
//           order: { createdAt: 'DESC' },
//         });

//         const previousBalance = Number(lastEntry?.balanceAfter ?? 0);
//         const newBalance = previousBalance - dto.amount;

//         await manager.save(
//           manager.create(AccountEntry, {
//             client,
//             sale: touchedSales.length === 1 ? touchedSales[0] : undefined,
//             payment,
//             type: 'PAYMENT',
//             amount: dto.amount,
//             balanceAfter: newBalance,
//             description: 'Pago recibido',
//             status: 'ACTIVE'
//           })
//         );

//         client.totalDebtCache = newBalance;
//         await manager.save(client);
//       }

//       return payment;
//     });
//   }

//   //pago directo a la cuenta corriente
// async createDirectPayment(dto: CreateDirectPaymentDto) {
//   if (dto.amount <= 0) {
//     throw new BadRequestException('El monto debe ser mayor a 0');
//   }

//   return this.dataSource.transaction(async manager => {
//     /* =====================
//        Cliente
//     ====================== */
//     const client = await manager.findOne(Client, {
//       where: { id: dto.clientId },
//     });

//     if (!client) {
//       throw new NotFoundException('Cliente no encontrado');
//     }

//     /* =====================
//        Caja
//     ====================== */
//     let cash = await manager.findOne(CashRegister, {
//       where: { openedBy: dto.receivedBy, status: 'OPEN' },
//     });

//     if (!cash) {
//       cash = await manager.save(
//         manager.create(CashRegister, {
//           name: `Caja automática ${dto.receivedBy}`,
//           openingAmount: 0,
//           status: 'OPEN',
//           openedBy: dto.receivedBy,
//           openedAt: new Date(),
//         }),
//       );
//     }

//     /* =====================
//        Pago
//     ====================== */
//     const payment = await manager.save(
//       manager.create(Payment, {
//         amount: dto.amount,
//         paymentMethod: dto.paymentMethod,
//         receivedBy: dto.receivedBy,
//         cashRegisterId: cash.id,
//         paymentDate: new Date(),
//         status: 'COMPLETED',
//       }),
//     );

//     /* =====================
//        Caja movimiento
//     ====================== */
//     await manager.save(
//       manager.create(CashMovement, {
//         cashRegister: cash,
//         type: 'IN',
//         amount: dto.amount,
//         reason: 'Pago directo a cuenta corriente',
//         relatedPaymentId: payment.id,
//       }),
//     );

//     /* =====================
//        Cuenta corriente
//     ====================== */
//     const lastEntry = await manager.findOne(AccountEntry, {
//       where: { client: { id: client.id } },
//       order: { createdAt: 'DESC' },
//     });

//     const previousBalance = Number(lastEntry?.balanceAfter ?? 0);
//     const newBalance = previousBalance - dto.amount;

//     const accountEntry = await manager.save(
//       manager.create(AccountEntry, {
//         client,
//         payment,
//         type: 'PAYMENT',
//         amount: dto.amount,
//         balanceAfter: newBalance,
//         description:
//           dto.description ?? 'Pago directo a cuenta corriente',
//         status: 'ACTIVE',
//       }),
//     );

//     client.totalDebtCache = newBalance;
//     await manager.save(client);

//     /* =====================
//        Últimos movimientos
//     ====================== */
//     const lastMovements = await manager.find(AccountEntry, {
//       where: { client: { id: client.id } },
//       order: { createdAt: 'DESC' },
//       take: 5,
//     });

//     /* =====================
//        Response
//     ====================== */
//     return {
//       payment: {
//         id: payment.id,
//         amount: payment.amount,
//         paymentMethod: payment.paymentMethod,
//         paymentDate: payment.paymentDate,
//       },
//       summary: {
//         entrega: dto.amount,
//         saldoAnterior: previousBalance,
//         saldoTotal: newBalance,
//       },
//       lastMovements: lastMovements.map(m => ({
//         type: m.type,
//         amount: m.amount,
//         balanceAfter: m.balanceAfter,
//         createdAt: m.createdAt,
//       })),
//     };
//   });
// }

// }

//ref
import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { Sale } from 'src/sale/entities/sale.entity';
import { PaymentAllocation } from 'src/payment-allocation/entities/payment-allocation.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { CashMovement } from 'src/cash-movement/entities/cash-movement.entity';
import { AccountEntry } from 'src/acount-entry/entities/acount-entry.entity';
import { CashRegister } from 'src/cash-register/entities/cash-register.entity';
import { Client } from 'src/client/entities/client.entity';
import { CreateDirectPaymentDto } from './dto/create-direct-payment.dto';
import { User } from 'src/user/entities/user.entity';

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

  /* =========================
     PAGO CON ASIGNACIONES
  ========================== */
  async create(dto: CreatePaymentDto) {
    if (dto.amount <= 0) {
      throw new BadRequestException('El monto debe ser mayor a 0');
    }

    return this.dataSource.transaction(async manager => {
      /* ========= USUARIO ========= */
      const user = await manager.findOne(User, {
        where: { id: dto.receivedBy },
      });

      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }

      /* ========= CAJA ========= */
      let cash = await manager.findOne(CashRegister, {
        where: { openedBy: user.id, status: 'OPEN' },
      });

      if (!cash) {
        cash = await manager.save(
          manager.create(CashRegister, {
            name: `Caja automática ${user.firstname}`,
            openingAmount: 0,
            status: 'OPEN',
            openedBy: user.id,
            openedAt: new Date(),
          }),
        );

        await manager.save(
          manager.create(CashMovement, {
            cashRegister: cash,
            type: 'IN',
            amount: 0,
            reason: 'Apertura automática de caja',
          }),
        );
      }

      /* ========= PAGO ========= */
      const payment = await manager.save(
        manager.create(Payment, {
          amount: dto.amount,
          paymentMethod: dto.paymentMethod,
          receivedBy: user,
          cashRegister: cash,
          status: 'COMPLETED',
        }),
      );

      let remaining = dto.amount;
      const touchedSales: Sale[] = [];

      /* ========= ALLOCATIONS ========= */
      for (const alloc of dto.allocations) {
        const sale = await manager.findOne(Sale, {
          where: { id: alloc.saleId },
          relations: ['client'],
        });

        if (!sale) throw new NotFoundException('Venta no encontrada');
        if (sale.status === 'CANCELLED')
          throw new ConflictException('Venta cancelada');
        if (sale.status === 'DRAFT')
          throw new ConflictException('Venta no confirmada');

        const pending =
          Number(sale.totalAmount) - Number(sale.paidAmount);

        if (alloc.amount > pending) {
          throw new ConflictException('Monto supera saldo pendiente');
        }

        await manager.save(
          manager.create(PaymentAllocation, {
            payment,
            sale,
            amountApplied: alloc.amount,
          }),
        );

        sale.paidAmount += alloc.amount;
        sale.status =
          sale.paidAmount >= sale.totalAmount ? 'PAID' : 'PAID_PARTIAL';

        await manager.save(sale);

        remaining -= alloc.amount;
        touchedSales.push(sale);
      }

      if (remaining !== 0) {
        throw new ConflictException('Pago no totalmente asignado');
      }

      /* ========= MOVIMIENTO CAJA ========= */
      await manager.save(
        manager.create(CashMovement, {
          cashRegister: cash,
          type: 'IN',
          amount: dto.amount,
          reason: 'Pago de cliente',
          relatedPaymentId: payment.id,
        }),
      );

      /* ========= CUENTA CORRIENTE ========= */
      const client = touchedSales[0]?.client;
      if (client) {
        const lastEntry = await manager.findOne(AccountEntry, {
          where: { client: { id: client.id } },
          order: { createdAt: 'DESC' },
        });

        const previous = Number(lastEntry?.balanceAfter ?? 0);
        const newBalance = previous - dto.amount;

        await manager.save(
          manager.create(AccountEntry, {
            client,
            sale: touchedSales.length === 1 ? touchedSales[0] : undefined,
            payment,
            type: 'PAYMENT',
            amount: dto.amount,
            balanceAfter: newBalance,
            description: 'Pago recibido',
            status: 'ACTIVE',
          }),
        );

        client.totalDebtCache = newBalance;
        await manager.save(client);
      }

      return payment;
    });
  }

  /* =========================
     PAGO DIRECTO (SIN VENTA)
  ========================== */
  async createDirectPayment(dto: CreateDirectPaymentDto) {
    if (dto.amount <= 0) {
      throw new BadRequestException('El monto debe ser mayor a 0');
    }

    return this.dataSource.transaction(async manager => {
      const client = await manager.findOne(Client, {
        where: { id: dto.clientId },
      });
      if (!client) throw new NotFoundException('Cliente no encontrado');

      const user = await manager.findOne(User, {
        where: { id: dto.receivedBy },
      });
      if (!user) throw new NotFoundException('Usuario no encontrado');

      let cash = await manager.findOne(CashRegister, {
        where: { openedBy: user.id, status: 'OPEN' },
      });

      if (!cash) {
        cash = await manager.save(
          manager.create(CashRegister, {
            name: `Caja automática ${user.firstname}`,
            openingAmount: 0,
            status: 'OPEN',
            openedBy: user.id,
            openedAt: new Date(),
          }),
        );
      }

      const payment = await manager.save(
        manager.create(Payment, {
          amount: dto.amount,
          paymentMethod: dto.paymentMethod,
          receivedBy: user,
          cashRegister: cash,
          status: 'COMPLETED',
        }),
      );

      await manager.save(
        manager.create(CashMovement, {
          cashRegister: cash,
          type: 'IN',
          amount: dto.amount,
          reason: 'Pago directo a cuenta corriente',
          relatedPaymentId: payment.id,
        }),
      );

      const lastEntry = await manager.findOne(AccountEntry, {
        where: { client: { id: client.id } },
        order: { createdAt: 'DESC' },
      });

      const previous = Number(lastEntry?.balanceAfter ?? 0);
      const newBalance = previous - dto.amount;

      await manager.save(
        manager.create(AccountEntry, {
          client,
          payment,
          type: 'PAYMENT',
          amount: dto.amount,
          balanceAfter: newBalance,
          description:
            dto.description ?? 'Pago directo a cuenta corriente',
          status: 'ACTIVE',
        }),
      );

      client.totalDebtCache = newBalance;
      await manager.save(client);

      return payment;
    });
  }
}
