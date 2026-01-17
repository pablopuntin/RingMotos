// src/account-statement/account-statement.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AccountEntry } from 'src/acount-entry/entities/acount-entry.entity';
import { Client } from 'src/client/entities/client.entity';
import { MoneyUtils } from 'src/common/utils/money.utils';
import { SupplierAccountStatementResponseDto } from './dto/supplier-statement-response.dto';
import { Supplier } from 'src/supplier/entities/supplier.entity';

@Injectable()
export class AccountStatementService {
  constructor(
    @InjectRepository(AccountEntry)
    private readonly accountEntryRepo: Repository<AccountEntry>,

    @InjectRepository(Client)
    private readonly clientRepo: Repository<Client>,

    @InjectRepository(Supplier)
    private readonly supplierRepo: Repository<Supplier>,
    
  ) {}

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


//metodo de estado de cuenta para supplier
async getSupplierStatement(
  supplierId: string,
  desde?: string,
  hasta?: string,
  limit = 10,
): Promise<SupplierAccountStatementResponseDto> {
  const supplier = await this.supplierRepo.findOne({ where: { id: supplierId } });
  if (!supplier) throw new NotFoundException('Proveedor no encontrado');

  const remitoRepo = this.accountEntryRepo.manager.getRepository('Remito');

  const qb = remitoRepo.createQueryBuilder('r')
    .where("r.snapshot ->> '_supplierId' = :supplierId", { supplierId })
    .orderBy('r.createdAt', 'DESC');

  if (desde) {
    qb.andWhere('r.createdAt >= :desde', { desde: new Date(desde) });
  }

  if (hasta) {
    qb.andWhere('r.createdAt <= :hasta', { hasta: new Date(hasta) });
  }

  if (!desde && !hasta) {
    qb.take(limit);
  }

  const remitos = await qb.getMany();

  // El último saldo real, buscando en el snapshot summary
  const finalBalance = remitos.length > 0
    ? remitos[0].snapshot?.summary?.deudaActual ?? '0.00'
    : '0.00';

  const movements = remitos.map(r => ({
    id: r.id,
    type: r.type,
    date: r.createdAt,
    description: r.snapshot?.description ?? r.type,
    debit: r.type === 'PURCHASE_CONFIRMED' ? (r.snapshot?.totalAmount ?? '0.00') : '0',
    credit: r.type === 'SUPPLIER_PAYMENT' ? (r.snapshot?.payment?.amount ?? '0.00') : '0',
    balanceAfter: r.snapshot?.summary?.deudaActual ?? finalBalance,
    purchase: r.snapshot?.purchase ?? null,
    payment: r.snapshot?.payment ?? null,
    summary: r.snapshot?.summary ?? null,
    snapshot: r.snapshot, // incluir snapshot completo para detalle
  }));

  return {
    supplier: {
      id: supplier.id,
      name: supplier.name,
    },
    movements,
    finalBalance,
  };
}



}