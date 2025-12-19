import { Injectable } from "@nestjs/common";
import { AccountEntry } from "src/acount-entry/entities/acount-entry.entity";
import { Client } from "src/client/entities/client.entity";
import { BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AccountAdjustmentController } from './account-adjustment.controller';
import { Repository } from "typeorm";


@Injectable()
export class AccountAdjustmentService {
  constructor(
    @InjectRepository(AccountEntry)
    private readonly accountRepo: Repository<AccountEntry>,

    @InjectRepository(Client)
    private readonly clientRepo: Repository<Client>,
  ) {}

  async applyInterest(params: {
    clientId: string;
    amount: number;
    description: string;
    saleId?: string;
  }) {
    const client = await this.clientRepo.findOneBy({ id: params.clientId });
    if (!client) throw new BadRequestException('Cliente no encontrado');

    const last = await this.accountRepo.findOne({
      where: { client: { id: client.id } },
      order: { createdAt: 'DESC' },
    });

    const prevBalance = Number(last?.balanceAfter ?? 0);
    const newBalance = prevBalance + Number(params.amount);

    const entry = this.accountRepo.create({
      client,
      type: 'INTEREST',
      sale: params.saleId ? { id: params.saleId } as any : null,
      amount: params.amount,
      balanceAfter: newBalance,
      description: params.description,
      status: 'ACTIVE',
    });

    return this.accountRepo.save(entry);
  }

  async applyAdjustment(params: {
  clientId: string;
  amount: number; // + o -
  description: string;
  saleId?: string;
}) {
  // mismo patrón que applyInterest
}

}
