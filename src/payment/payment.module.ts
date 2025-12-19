// import { Module } from '@nestjs/common';
// import { PaymentService } from './payment.service';
// import { PaymentController } from './payment.controller';
// import { Payment } from './entities/payment.entity';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { PaymentAllocation } from 'src/payment-allocation/entities/payment-allocation.entity';
// import { Sale } from 'src/sale/entities/sale.entity';


// @Module({
//   imports: [TypeOrmModule.forFeature([Payment, PaymentAllocation, Sale ])],
//   controllers: [PaymentController],
//   providers: [PaymentService]
// })
// export class PaymentModule {}


import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Payment } from './entities/payment.entity';
import { PaymentAllocation } from '../payment-allocation/entities/payment-allocation.entity';
import { CashMovement } from '../cash-movement/entities/cash-movement.entity';
import { AccountEntry } from '../acount-entry/entities/acount-entry.entity';
import { Sale } from '../sale/entities/sale.entity';

import { PaymentService } from './payment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Payment,
      PaymentAllocation,
      CashMovement,
      AccountEntry,
      Sale,
    ]),
  ],
  providers: [PaymentService],
  exports: [PaymentService], // 👈 CLAVE
})
export class PaymentModule {}
