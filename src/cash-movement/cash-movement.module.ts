import { Module } from '@nestjs/common';
import { CashMovement } from './entities/cash-movement.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CashMovementsController } from './cash-movement.controller';
import { CashMovementsService } from './cash-movement.service';

@Module({
  imports: [TypeOrmModule.forFeature([CashMovement])],
  controllers: [CashMovementsController],
  providers: [CashMovementsService]
})
export class CashMovementModule {}
