import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';

import { AccountEntry } from './entities/acount-entry.entity';
import { Client } from 'src/client/entities/client.entity';
import { Sale } from 'src/sale/entities/sale.entity';
import { Payment } from 'src/payment/entities/payment.entity';
import { CreateAccountEntryDto } from './dto/create-acount-entry.dto';

@Injectable()
export class AccountEntryService {
  constructor(
    @InjectRepository(AccountEntry)
    private readonly repo: Repository<AccountEntry>,

    @InjectRepository(Client)
    private readonly clientRepo: Repository<Client>,

    @InjectRepository(Sale)
    private readonly saleRepo: Repository<Sale>,

    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
  ) {}

  /* =====================================================
     BALANCE
  ===================================================== */

  async getLastBalance(clientId: string): Promise<number> {
    const last = await this.repo.findOne({
      where: { client: { id: clientId } },
      order: { createdAt: 'DESC' },
    });

    return last ? Number(last.balanceAfter) : 0;
  }

  /* =====================================================
     CREAR MOVIMIENTO
  ===================================================== */

  // async create(dto: CreateAccountEntryDto) {
  //   const client = await this.clientRepo.findOneBy({ id: dto.clientId });
  //   if (!client) {
  //     throw new BadRequestException('Cliente no encontrado');
  //   }

  //   const lastBalance = await this.getLastBalance(client.id);

  //   let sale: Sale | null = null;
  //   let payment: Payment | null = null;

  //   if (dto.saleId) {
  //     sale = await this.saleRepo.findOneBy({ id: dto.saleId });
  //     if (!sale) {
  //       throw new BadRequestException('Venta no encontrada');
  //     }
  //   }

  //   if (dto.paymentId) {
  //     payment = await this.paymentRepo.findOneBy({ id: dto.paymentId });
  //     if (!payment) {
  //       throw new BadRequestException('Pago no encontrado');
  //     }
  //   }

  //   const newBalance =
  //     dto.type === 'PAYMENT'
  //       ? lastBalance - Number(dto.amount)
  //       : lastBalance + Number(dto.amount);

  //   const entry = this.repo.create({
  //     client,
  //     type: dto.type,
  //     sale,
  //     payment,
  //     amount: dto.amount,
  //     balanceAfter: newBalance,
  //     description: dto.description,
  //     status: dto.status ?? 'ACTIVE',
  //   } as Partial<AccountEntry>);

  //   return this.repo.save(entry);
  // }

  //refactor
  async create(dto: CreateAccountEntryDto) {
  const client = await this.clientRepo.findOneBy({ id: dto.clientId });
  if (!client) {
    throw new BadRequestException('Cliente no encontrado');
  }

  const lastBalance = await this.getLastBalance(client.id);

  // Validar que saleId y paymentId, si vienen, existen
  const sale = dto.saleId ? await this.saleRepo.findOneBy({ id: dto.saleId }) : null;
  if (dto.saleId && !sale) {
    throw new BadRequestException('Venta no encontrada');
  }

  const payment = dto.paymentId ? await this.paymentRepo.findOneBy({ id: dto.paymentId }) : null;
  if (dto.paymentId && !payment) {
    throw new BadRequestException('Pago no encontrado');
  }

  // Validar que el pago no deje saldo negativo
  if (dto.type === 'PAYMENT') {
    const newBalance = lastBalance - Number(dto.amount);
    if (newBalance < 0) {
      throw new BadRequestException('El pago excede el saldo pendiente');
    }
  }

  // Calcular nuevo saldo
  const newBalance =
    dto.type === 'PAYMENT'
      ? lastBalance - Number(dto.amount)
      : lastBalance + Number(dto.amount);

  const entry = this.repo.create({
    client,
    type: dto.type,
    sale,
    payment,
    amount: dto.amount,
    balanceAfter: newBalance,
    description: dto.description,
    status: dto.status ?? 'ACTIVE',
  } as Partial<AccountEntry>);

  return this.repo.save(entry);
}


  /* =====================================================
     CUENTA CORRIENTE COMPLETA
  ===================================================== */

  findByClient(clientId: string) {
    return this.repo.find({
      where: { client: { id: clientId } },
      order: { createdAt: 'ASC' },
      relations: [
        'sale',
        'sale.items', // ✅ ítems de la venta
        'payment',
      ],
    });
  }

  /* =====================================================
     HISTORIAL CON FILTRO DE FECHAS
  ===================================================== */

  async getHistory(clientId: string, start?: Date, end?: Date) {
    return this.repo.find({
      where: {
        client: { id: clientId },
        ...(start && end ? { createdAt: Between(start, end) } : {}),
      },
      order: { createdAt: 'ASC' },
      relations: [
        'sale',
        'sale.items', // ✅ ítems de la venta
        'payment',
      ],
    });
  }

  /* =====================================================
     RESUMEN MENSUAL
  ===================================================== */

  async getMonthlySummary(clientId: string, month: number, year: number) {
    if (!month || !year) {
      throw new BadRequestException('Month y year son obligatorios');
    }

    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0, 23, 59, 59);

    const entries = await this.getHistory(clientId, start, end);

    const charges = entries
      .filter(e => e.type === 'CHARGE')
      .reduce((sum, e) => sum + Number(e.amount), 0);

    const payments = entries
      .filter(e => e.type === 'PAYMENT')
      .reduce((sum, e) => sum + Number(e.amount), 0);

    const adjustments = entries
      .filter(e => e.type === 'ADJUSTMENT')
      .reduce((sum, e) => sum + Number(e.amount), 0);

    const lastBalance = entries.length
      ? Number(entries[entries.length - 1].balanceAfter)
      : 0;

    return { charges, payments, adjustments, lastBalance };
  }

  /* =====================================================
     RESUMEN GENERAL (SALDO + ÚLTIMOS MOVIMIENTOS)
  ===================================================== */

  async getSummary(clientId: string, limit = 10) {
    const client = await this.clientRepo.findOneBy({ id: clientId });
    if (!client) {
      throw new BadRequestException('Cliente no encontrado');
    }

    const lastBalance = await this.getLastBalance(clientId);

    const movements = await this.repo.find({
      where: { client: { id: clientId } },
      order: { createdAt: 'DESC' },
      take: limit,
      relations: [
        'sale',
        'sale.items', // ✅ ítems de la venta
        'payment',
      ],
    });

    return {
      clientId,
      lastBalance,
      recentMovements: movements,
    };
  }
}
