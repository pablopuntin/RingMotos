import { Module } from '@nestjs/common';
import { PosController } from './pos.controller';
import { PosService } from './pos.service';
import { SaleModule } from 'src/sale/sale.module';
import { PaymentModule } from 'src/payment/payment.module';

@Module({
  imports: [
    SaleModule,
    PaymentModule
  ],
  controllers: [PosController],
  providers: [PosService]
})
export class PosModule {}
