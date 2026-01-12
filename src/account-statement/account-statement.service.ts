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
