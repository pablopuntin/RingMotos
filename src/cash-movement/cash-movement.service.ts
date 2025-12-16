// import { Injectable } from '@nestjs/common';
// import { CreateCashMovementDto } from './dto/create-cash-movement.dto';
// import { UpdateCashMovementDto } from './dto/update-cash-movement.dto';

// @Injectable()
// export class CashMovementService {
//   create(createCashMovementDto: CreateCashMovementDto) {
//     return 'This action adds a new cashMovement';
//   }

//   findAll() {
//     return `This action returns all cashMovement`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} cashMovement`;
//   }

//   update(id: number, updateCashMovementDto: UpdateCashMovementDto) {
//     return `This action updates a #${id} cashMovement`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} cashMovement`;
//   }
// }

//refactor
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { CashMovement } from './entities/cash-movement.entity';

@Injectable()
export class CashMovementsService {
  constructor(
    @InjectRepository(CashMovement) private movementsRepo: Repository<CashMovement>,
  ) {}

  async listMovements(filters: { cashRegisterId?: string; from?: string; to?: string; type?: 'IN' | 'OUT' }) {
    const where: any = {};
    if (filters.cashRegisterId) where.cashRegisterId = filters.cashRegisterId;
    if (filters.type) where.type = filters.type;
    if (filters.from && filters.to) {
      where.createdAt = Between(new Date(filters.from), new Date(filters.to));
    }

    return this.movementsRepo.find({
      where,
      order: { createdAt: 'DESC' },
    });
  }
}
