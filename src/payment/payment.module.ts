import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { PaymentAllocation } from '../payment-allocation/entities/payment-allocation.entity';
import { CashMovement } from '../cash-movement/entities/cash-movement.entity';
import { AccountEntry } from '../acount-entry/entities/acount-entry.entity';
import { Sale } from '../sale/entities/sale.entity';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller'; // 👈 IMPORTAR

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Payment,
      PaymentAllocation,
      CashMovement,
      AccountEntry,
      Sale
    ])
  ],
  controllers: [PaymentController], // 👈 AGREGAR
  providers: [PaymentService],
  exports: [PaymentService]
})
export class PaymentModule {}
