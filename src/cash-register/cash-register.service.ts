// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository, DataSource } from 'typeorm';
// import { CashMovement } from 'src/cash-movement/entities/cash-movement.entity';
// import { CashRegister } from './entities/cash-register.entity';

// @Injectable()
// export class CashRegistersService {
//   constructor(
//     @InjectRepository(CashRegister) private cashRepo: Repository<CashRegister>,
//     @InjectRepository(CashMovement) private movementsRepo: Repository<CashMovement>,
//     private dataSource: DataSource
//   ) {}

//   async openCashRegister(dto: any) {
//     // Crear la caja
//     const cash = this.cashRepo.create({
//       name: dto.name,
//       openingAmount: dto.openingAmount,
//       status: 'OPEN',
//       openedBy: dto.openedBy,
//       openedAt: new Date(),
//     });
//     const savedCash = await this.cashRepo.save(cash);

//     // 🔹 NUEVO: registrar movimiento de apertura
//     const openingMovement = this.movementsRepo.create({
//        cashRegister: { id: savedCash.id },
//       type: 'IN', // lo marcamos como entrada
//       amount: savedCash.openingAmount,
//       reason: 'Apertura de caja',
//       relatedSaleId: null,
//       relatedPaymentId: null,
//       relatedSupplierPaymentId: null,
//       createdAt: new Date()
//     });
//     await this.movementsRepo.save(openingMovement);

//     return savedCash;
//   }

//   async closeCashRegister(id: string, dto: any) {
//   return this.dataSource.transaction(async manager => {
//     const cash = await manager.findOne(CashRegister, { where: { id } });
//     if (!cash || cash.status !== 'OPEN') throw new Error('Caja no abierta');

//     // calcular cierre
//     const movements = await manager.find(CashMovement, { where: { cashRegisterId: id } });
//     const totalIn = movements.filter(m => m.type === 'IN').reduce((s, m) => s + Number(m.amount), 0);
//     const totalOut = movements.filter(m => m.type === 'OUT').reduce((s, m) => s + Number(m.amount), 0);
//     const closingAmount = Number(cash.openingAmount) + totalIn - totalOut;

//     cash.status = 'CLOSED';
//     cash.closingAmount = closingAmount;
//     cash.closedAt = new Date();
//     const savedCash = await manager.save(cash);

//     // 🔹 registrar movimiento de cierre
//     const closingMovement = this.movementsRepo.create({
//       cashRegisterId: savedCash.id,   // 👈 ahora sí válido
//       type: 'OUT',
//       amount: savedCash.closingAmount,
//       reason: 'Cierre de caja',
//       relatedSaleId: null,
//       relatedPaymentId: null,
//       relatedSupplierPaymentId: null,
//       createdAt: new Date(),
//     });
//     await this.movementsRepo.save(closingMovement);

//     return savedCash;
//   });
// }


//   async getCashRegister(id: string) {
//     return this.cashRepo.findOne({ where: { id } });
//   }

//   async getMovements(id: string) {
//     return this.movementsRepo.find({
//       where: { cashRegisterId: id },
//       order: { createdAt: 'DESC' },
//     });
//   }
// }

import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { CashMovement } from 'src/cash-movement/entities/cash-movement.entity';
import { CashRegister } from './entities/cash-register.entity';

@Injectable()
export class CashRegistersService {
  constructor(
    @InjectRepository(CashRegister)
    private readonly cashRepo: Repository<CashRegister>,

    @InjectRepository(CashMovement)
    private readonly movementsRepo: Repository<CashMovement>,

    private readonly dataSource: DataSource,
  ) {}

  // ============================
  // OPEN CASH REGISTER
  // ============================
  async openCashRegister(dto: any) {
    const cash = this.cashRepo.create({
      name: dto.name,
      openingAmount: dto.openingAmount,
      status: 'OPEN',
      openedBy: dto.openedBy,
      openedAt: new Date(),
    });

    const savedCash = await this.cashRepo.save(cash);

    const openingMovement = this.movementsRepo.create({
      type: 'IN',
      amount: savedCash.openingAmount,
      reason: 'Apertura de caja',
      cashRegister: { id: savedCash.id },
    });

    await this.movementsRepo.save(openingMovement);

    return savedCash;
  }

  // ============================
  // CLOSE CASH REGISTER (TX)
  // ============================
  async closeCashRegister(id: string) {
    return this.dataSource.transaction(async (manager) => {
      const cash = await manager.findOne(CashRegister, {
        where: { id },
      });

      if (!cash || cash.status !== 'OPEN') {
        throw new BadRequestException('Caja no abierta');
      }

      const movements = await manager.find(CashMovement, {
        where: {
          cashRegister: { id },
        },
      });

      const totalIn = movements
        .filter((m) => m.type === 'IN')
        .reduce((sum, m) => sum + Number(m.amount), 0);

      const totalOut = movements
        .filter((m) => m.type === 'OUT')
        .reduce((sum, m) => sum + Number(m.amount), 0);

      const closingAmount =
        Number(cash.openingAmount) + totalIn - totalOut;

      cash.status = 'CLOSED';
      cash.closingAmount = closingAmount;
      cash.closedAt = new Date();

      const savedCash = await manager.save(cash);

      const closingMovement = manager.create(CashMovement, {
        type: 'OUT',
        amount: closingAmount,
        reason: 'Cierre de caja',
        cashRegister: { id: savedCash.id },
      });

      await manager.save(closingMovement);

      return savedCash;
    });
  }

  // ============================
  // GET CASH REGISTER
  // ============================
  async getCashRegister(id: string) {
    return this.cashRepo.findOne({
      where: { id },
    });
  }

  // ============================
  // GET MOVEMENTS
  // ============================
  async getMovements(id: string) {
    return this.movementsRepo.find({
      where: {
        cashRegister: { id },
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }
}

