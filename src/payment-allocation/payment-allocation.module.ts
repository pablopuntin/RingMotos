import { Module } from '@nestjs/common';
import { PaymentAllocationService } from './payment-allocation.service';
import { PaymentAllocationController } from './payment-allocation.controller';
import { PaymentAllocation } from './entities/payment-allocation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentAllocation])],
  controllers: [PaymentAllocationController],
  providers: [PaymentAllocationService],
})
export class PaymentAllocationModule {}
