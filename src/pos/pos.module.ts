import { Module } from '@nestjs/common';
import { PosController } from './pos.controller';
import { PosService } from './pos.service';
import { SaleModule } from 'src/sale/sale.module';
import { PaymentModule } from 'src/payment/payment.module';
import { AccountEntryService } from 'src/acount-entry/acount-entry.service';
import { SalesService } from 'src/sale/sale.service';
import { PaymentService } from 'src/payment/payment.service';
import { AccountEntryModule } from 'src/acount-entry/acount-entry.module';

@Module({
  imports: [
    SaleModule,
    PaymentModule,
    AccountEntryModule
  ],
  controllers: [PosController],
  providers: [PosService]
})
export class PosModule {}

