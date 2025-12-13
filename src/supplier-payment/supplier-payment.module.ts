import { Module } from '@nestjs/common';
import { SupplierPaymentService } from './supplier-payment.service';
import { SupplierPaymentController } from './supplier-payment.controller';
import { SupplierPayment } from './entities/supplier-payment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SupplierPayment])],
  controllers: [SupplierPaymentController],
  providers: [SupplierPaymentService],
})
export class SupplierPaymentModule {}
