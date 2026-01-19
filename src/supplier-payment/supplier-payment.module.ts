import { Module } from '@nestjs/common';
import { SupplierPaymentsService } from './supplier-payment.service';
import { SupplierPaymentsController } from './supplier-payment.controller';
import { SupplierPayment } from './entities/supplier-payment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import { CashRegister } from 'src/cash-register/entities/cash-register.entity';
import { CashMovement } from 'src/cash-movement/entities/cash-movement.entity';
import { SupplierAccountEntry } from 'src/supplier-account-entry/entities/supplier-account-entry.entity';
import { RemitoModule } from 'src/remito/remito.module';

@Module({
  imports: [TypeOrmModule.forFeature([SupplierPayment, Supplier, CashRegister, CashMovement, SupplierAccountEntry]),
RemitoModule],
  controllers: [SupplierPaymentsController],
  providers: [SupplierPaymentsService],
})
export class SupplierPaymentModule {}
