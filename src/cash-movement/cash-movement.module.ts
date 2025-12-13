import { Module } from '@nestjs/common';
import { CashMovementService } from './cash-movement.service';
import { CashMovementController } from './cash-movement.controller';
import { CashMovement } from './entities/cash-movement.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CashMovement])],
  controllers: [CashMovementController],
  providers: [CashMovementService],
})
export class CashMovementModule {}
