import { Module } from '@nestjs/common';
import { CashRegistersService } from './cash-register.service';
import { CashRegistersController } from './cash-register.controller';
import { CashRegister } from './entities/cash-register.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CashMovement } from 'src/cash-movement/entities/cash-movement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CashRegister, CashMovement])],
  controllers: [CashRegistersController],
  providers: [CashRegistersService],
})
export class CashRegisterModule {}
