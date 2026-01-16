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

// async getStatement(clientId: string, userId: string) {
//   const client = await this.clientRepo.findOne({
//     where: { id: clientId },
//   });

//   if (!client) {
//     throw new NotFoundException('Cliente no encontrado');
//   }

//   // ==============================
//   // 1️⃣ TRAEMOS REMITOS DEL CLIENTE
//   // ==============================
//   const remitos = await this.accountEntryRepo.manager
//     .getRepository('Remito')
//     .find({
//       where: { client: { id: clientId } },
//       order: { createdAt: 'DESC' },
//       relations: ['client'],
//     });

//   // ==============================
//   // 2️⃣ TRAEMOS ÚLTIMO SALDO REAL
//   // ==============================
//   const lastEntry = await this.accountEntryRepo.findOne({
//     where: { client: { id: clientId } },
//     order: { createdAt: 'DESC' },
//   });

//   const finalBalance = lastEntry
//     ? MoneyUtils.round(Number(lastEntry.balanceAfter))
//     : MoneyUtils.round(0);

//   // ==============================
//   // 3️⃣ TRANSFORMAMOS REMITOS PARA EL FRONT
//   // ==============================
//   const movements = remitos.map(r => ({
//     id: r.id,
//     type: r.type, // "SALE_FINALIZED" o "DIRECT_PAYMENT"
//     date: r.createdAt,
//     snapshot: r.snapshot, // 👈 ACÁ VA TODO EL REMITO LISTO PARA IMPRIMIR
//   }));

//   // ==============================
//   // 4️⃣ RESPUESTA FINAL
//   // ==============================
//   return {
//     client: {
//       id: client.id,
//       name: `${client.name} ${client.lastName ?? ''}`,
//       totalDebtCache: MoneyUtils.round(Number(client.totalDebtCache)),
//     },
//     movements, // 👈 REMITO DEBAJO DE REMITO
//     finalBalance,
//   };
// }

//ref
async getStatement(
  clientId: string,
  userId: string,
  desde?: string,
  hasta?: string,
) {
  const client = await this.clientRepo.findOne({
    where: { id: clientId },
  });

  if (!client) {
    throw new NotFoundException('Cliente no encontrado');
  }

  // ==============================
  // 1️⃣ BASE QUERY DE REMITOS
  // ==============================
  const remitoRepo = this.accountEntryRepo.manager.getRepository('Remito');

  const qb = remitoRepo.createQueryBuilder('r')
    .leftJoinAndSelect('r.client', 'client')
    .where('client.id = :clientId', { clientId })
    .orderBy('r.createdAt', 'DESC');

  // ==============================
  // 2️⃣ FILTRO POR FECHAS (OPCIONAL)
  // ==============================
  if (desde) {
    qb.andWhere('r.createdAt >= :desde', { desde: new Date(desde) });
  }

  if (hasta) {
    qb.andWhere('r.createdAt <= :hasta', { hasta: new Date(hasta) });
  }

  // ==============================
  // 3️⃣ LÍMITE POR DEFECTO: 10
  // ==============================
  if (!desde && !hasta) {
    qb.take(10);
  }

  const remitos = await qb.getMany();

  // ==============================
  // 4️⃣ ÚLTIMO SALDO REAL
  // ==============================
  const lastEntry = await this.accountEntryRepo.findOne({
    where: { client: { id: clientId } },
    order: { createdAt: 'DESC' },
  });

  const finalBalance = lastEntry
    ? MoneyUtils.round(Number(lastEntry.balanceAfter))
    : MoneyUtils.round(0);

  // ==============================
  // 5️⃣ FORMATO FINAL PARA EL FRONT
  // ==============================
  const movements = remitos.map(r => ({
    id: r.id,
    type: r.type, // "SALE_FINALIZED" o "DIRECT_PAYMENT"
    date: r.createdAt,
    snapshot: r.snapshot,
  }));

  return {
    client: {
      id: client.id,
      name: `${client.name} ${client.lastName ?? ''}`,
      totalDebtCache: MoneyUtils.round(Number(client.totalDebtCache)),
    },
    movements,
    finalBalance,
  };
}


}