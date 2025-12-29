import { Injectable } from "@nestjs/common";
import { AccountEntry } from "src/acount-entry/entities/acount-entry.entity";
import { Client } from "src/client/entities/client.entity";
import { BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AccountAdjustmentController } from "./account-adjustment.controller";
import { Repository } from "typeorm";
import { Sale } from "src/sale/entities/sale.entity";


@Injectable()
export class AccountAdjustmentService {
  constructor(
    @InjectRepository(AccountEntry)
    private readonly accountRepo: Repository<AccountEntry>,

    @InjectRepository(Client)
    private readonly clientRepo: Repository<Client>,

    @InjectRepository(Sale)
    private readonly saleRepo: Repository<Sale>
  ) {}

// async applyInterest(params: {
//   clientId: string;
//   amount?: number;
//   description?: string;
//   saleId?: string;
// }) {
//   const client = await this.clientRepo.findOneBy({ id: params.clientId });
//   if (!client) throw new BadRequestException('Cliente no encontrado');

//   const last = await this.accountRepo.findOne({
//     where: { client: { id: client.id } },
//     order: { createdAt: 'DESC' }
//   });

//   const prevBalance = Number(last?.balanceAfter ?? 0);
//   const newBalance = prevBalance + Number(params.amount ?? 0); // si no hay amount, se suma 0

//   const entry = this.accountRepo.create({
//     client,
//     type: 'INTEREST',
//     sale: params.saleId ? { id: params.saleId } as any : null,
//     amount: params.amount ?? 0,
//     balanceAfter: newBalance,
//     description: params.description ?? '',
//     status: 'ACTIVE'
//   });

//   return this.accountRepo.save(entry);
// }

//refactor con interes
async applyInterest(params: {
  clientId: string;
  percentage?: number; // ahora es porcentaje
  description?: string;
  saleId?: string;
}) {
  const client = await this.clientRepo.findOneBy({ id: params.clientId });
  if (!client) throw new BadRequestException('Cliente no encontrado');

  const last = await this.accountRepo.findOne({
    where: { client: { id: client.id } },
    order: { createdAt: 'DESC' }
  });

  const prevBalance = Number(last?.balanceAfter ?? 0);

  // si no hay porcentaje, se aplica 0%
  const interestRate = Number(params.percentage ?? 0);
  const interestAmount = prevBalance * (interestRate / 100);
  const newBalance = prevBalance + interestAmount;

  const entry = this.accountRepo.create({
    client,
    type: 'INTEREST',
    sale: params.saleId ? { id: params.saleId } as any : null,
    amount: interestAmount, // monto calculado
    balanceAfter: newBalance,
    description: params.description ?? '',
    status: 'ACTIVE'
  });

  return this.accountRepo.save(entry);
}


async applyAdjustment(params: {
  clientId: string;
  amount?: number;
  description?: string;
  saleId?: string;
}) {
  const client = await this.clientRepo.findOneBy({ id: params.clientId });
  if (!client) throw new BadRequestException('Cliente no encontrado');

  const last = await this.accountRepo.findOne({
    where: { client: { id: client.id } },
    order: { createdAt: 'DESC' }
  });

  const prevBalance = Number(last?.balanceAfter ?? 0);
  const newBalance = prevBalance + Number(params.amount ?? 0);

  const entry = this.accountRepo.create({
    client,
    type: 'ADJUSTMENT',
    sale: params.saleId ? { id: params.saleId } as any : null,
    amount: params.amount ?? 0,
    balanceAfter: newBalance,
    description: params.description ?? '',
    status: 'ACTIVE'
  });

  return this.accountRepo.save(entry);
}

}
