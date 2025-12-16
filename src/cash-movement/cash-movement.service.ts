// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository, Between } from 'typeorm';
// import { CashMovement } from './entities/cash-movement.entity';

// @Injectable()
// export class CashMovementsService {
//   constructor(
//     @InjectRepository(CashMovement) private movementsRepo: Repository<CashMovement>,
//   ) {}

//   async listMovements(filters: { cashRegisterId?: string; from?: string; to?: string; type?: 'IN' | 'OUT' }) {
//     const where: any = {};
//     if (filters.cashRegisterId) where.cashRegisterId = filters.cashRegisterId;
//     if (filters.type) where.type = filters.type;
//     if (filters.from && filters.to) {
//       where.createdAt = Between(new Date(filters.from), new Date(filters.to));
//     }

//     return this.movementsRepo.find({
//       where,
//       order: { createdAt: 'DESC' },
//     });
//   }
// }

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { CashMovement } from './entities/cash-movement.entity';

@Injectable()
export class CashMovementsService {
  constructor(
    @InjectRepository(CashMovement)
    private readonly movementsRepo: Repository<CashMovement>,
  ) {}

  async listMovements(filters: {
    cashRegisterId?: string;
    from?: string;
    to?: string;
    type?: 'IN' | 'OUT';
  }) {
    const where: any = {};

    // ✅ filtro por caja (RELACIÓN)
    if (filters.cashRegisterId) {
      where.cashRegister = { id: filters.cashRegisterId };
    }

    // ✅ filtro por tipo
    if (filters.type) {
      where.type = filters.type;
    }

    // ✅ fechas (por defecto HOY)
    let fromDate: Date;
    let toDate: Date;

    if (filters.from && filters.to) {
      fromDate = new Date(filters.from);
      toDate = new Date(filters.to);
    } else {
      // 🔹 inicio y fin del día actual
      fromDate = new Date();
      fromDate.setHours(0, 0, 0, 0);

      toDate = new Date();
      toDate.setHours(23, 59, 59, 999);
    }

    where.createdAt = Between(fromDate, toDate);

    return this.movementsRepo.find({
      where,
      order: { createdAt: 'DESC' },
      relations: ['cashRegister'], // opcional
    });
  }
}
