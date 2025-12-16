import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { Payment } from './entities/payment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentAllocation } from 'src/payment-allocation/entities/payment-allocation.entity';
import { Sale } from 'src/sale/entities/sale.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Payment, PaymentAllocation, Sale ])],
  controllers: [PaymentController],
  providers: [PaymentService]
})
export class PaymentModule {}
