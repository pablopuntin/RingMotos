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

