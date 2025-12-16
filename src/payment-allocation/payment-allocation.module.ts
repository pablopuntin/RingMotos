import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentAllocation } from './entities/payment-allocation.entity';
import { PaymentAllocationService } from './payment-allocation.service';
import { PaymentAllocationController } from './payment-allocation.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentAllocation]),
  ],
  controllers: [PaymentAllocationController],
  providers: [PaymentAllocationService],
  exports: [PaymentAllocationService], // importante
})
export class PaymentAllocationModule {}
