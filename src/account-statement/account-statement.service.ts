// import { Injectable, NotFoundException } from "@nestjs/common";
// import { AccountEntry } from "src/acount-entry/entities/acount-entry.entity";
// import { AccountStatementQueryDto } from "./dto/account-statement-query.dto";
// import { Client } from "src/client/entities/client.entity";
// import { Repository } from "typeorm";
// import { InjectRepository } from "@nestjs/typeorm";


// @Injectable()
// export class AccountStatementService {
//   constructor(
//     @InjectRepository(AccountEntry)
//     private readonly accountRepo: Repository<AccountEntry>,

//     @InjectRepository(Client)
//     private readonly clientRepo: Repository<Client>,
//   ) {}

//   async getStatement(clientId: string, query: AccountStatementQueryDto) {
//     const client = await this.clientRepo.findOne({
//       where: { id: clientId },
//     });

//     if (!client) {
//       throw new NotFoundException('Cliente no encontrado');
//     }

//     const qb = this.accountRepo
//       .createQueryBuilder('ae')
//       .leftJoinAndSelect('ae.sale', 'sale')
//       .leftJoinAndSelect('sale.items', 'items')
//       .leftJoinAndSelect('sale.paymentAllocations', 'alloc')
//       .leftJoinAndSelect('ae.payment', 'payment')
//       .where('ae.client.id = :clientId', { clientId })
//       .orderBy('ae.createdAt', 'DESC');

//     if (query.from) {
//       qb.andWhere('ae.createdAt >= :from', { from: query.from });
//     }

//     if (query.to) {
//       qb.andWhere('ae.createdAt <= :to', { to: query.to });
//     }

//     if (query.limit) {
//       qb.take(query.limit);
//     }

//     const entries = await qb.getMany();

//     const movements = entries.map(entry => {
//       const isDebit = entry.type === 'CHARGE' ||
//         (entry.type === 'ADJUSTMENT' && entry.amount > 0);

//       const base = {
//         id: entry.id,
//         type: entry.type,
//         date: entry.createdAt,
//         description: entry.description,
//         debit: isDebit ? entry.amount.toFixed(2) : '0.00',
//         credit: !isDebit ? entry.amount.toFixed(2) : '0.00',
//         balanceAfter: entry.balanceAfter.toFixed(2),
//       };

//       if (entry.sale) {
//         const entrega = entry.sale.paymentAllocations?.reduce(
//           (sum, pa) => sum + Number(pa.amountApplied),
//           0,
//         ) ?? 0;

//         return {
//           ...base,
//           sale: {
//             id: entry.sale.id,
//             totalAmount: entry.sale.totalAmount.toFixed(2),
//             entrega: entrega.toFixed(2),
//             saldoVenta: (
//               Number(entry.sale.totalAmount) - entrega
//             ).toFixed(2),
//             items: entry.sale.items.map(i => ({
//               description: i.description,
//               qty: i.qty,
//               unitPrice: i.unitPrice.toFixed(2),
//               lineTotal: i.lineTotal.toFixed(2),
//             })),
//           },
//         };
//       }

//       if (entry.payment) {
//         return {
//           ...base,
//           payment: {
//             amount: entry.payment.amount.toFixed(2),
//             paymentMethod: entry.payment.paymentMethod,
//           },
//         };
//       }

//       return base;
//     });

//     const finalBalance =
//       movements.length > 0
//         ? movements[0].balanceAfter
//         : client.totalDebtCache;

//     return {
//       client: {
//         id: client.id,
//         name: client.name,
//       },
//       movements,
//       finalBalance,
//     };
//   }
// }


//ref
// src/account-statement/account-statement.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AccountEntry } from 'src/acount-entry/entities/acount-entry.entity';
import { Client } from 'src/client/entities/client.entity';
import { MoneyUtils } from 'src/common/utils/money.utils';

@Injectable()
export class AccountStatementService {
  constructor(
    @InjectRepository(AccountEntry)
    private readonly accountEntryRepo: Repository<AccountEntry>,

    @InjectRepository(Client)
    private readonly clientRepo: Repository<Client>,
  ) {}

  async getStatement(clientId: string, userId: string) {
    const client = await this.clientRepo.findOne({
      where: { id: clientId },
    });

    if (!client) {
      throw new NotFoundException('Cliente no encontrado');
    }

    const entries = await this.accountEntryRepo.find({
      where: { client: { id: clientId } },
      relations: [
        'sale',
        'sale.items',
        'sale.paymentAllocations',
        'payment',
      ],
      order: { createdAt: 'DESC' },
    });

    const movements = entries.map((entry) => {
      const amount = Number(entry.amount);
      const balanceAfter = Number(entry.balanceAfter);

      return {
        id: entry.id,
        type: entry.type,
        date: entry.createdAt,
        description: entry.description,

        debit:
          entry.type === 'CHARGE' || entry.type === 'ADJUSTMENT'
            ? MoneyUtils.round(amount)
            : MoneyUtils.round(0),

        credit:
          entry.type === 'PAYMENT'
            ? MoneyUtils.round(amount)
            : MoneyUtils.round(0),

        balanceAfter: MoneyUtils.round(balanceAfter),

        sale: entry.sale
          ? {
              id: entry.sale.id,
              totalAmount: MoneyUtils.round(entry.sale.totalAmount),
              paidAmount: MoneyUtils.round(entry.sale.paidAmount),
              items: entry.sale.items?.map((item) => ({
                description: item.description,
                qty: item.qty,
                unitPrice: MoneyUtils.round(item.unitPrice),
                lineTotal: MoneyUtils.round(item.lineTotal),
              })),
            }
          : null,

        payment: entry.payment
          ? {
              id: entry.payment.id,
              amount: MoneyUtils.round(entry.payment.amount),
              paymentMethod: entry.payment.paymentMethod,
              date: entry.payment.paymentDate,
            }
          : null,
      };
    });

    return {
      client: {
        id: client.id,
        name: client.name,
      },
      movements,
      finalBalance:
        movements.length > 0
          ? movements[0].balanceAfter
          : MoneyUtils.round(0),
    };
  }
}
