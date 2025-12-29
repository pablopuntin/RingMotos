import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { SalesController } from './sale.controller';
import { SalesService } from './sale.service';
import { SaleItem } from 'src/sale-item/entities/sale-item.entity';
import { Client } from 'src/client/entities/client.entity';
import { PosController } from './pos.controller';
import { RemitoModule } from 'src/remito/remito.module';
import { PaymentModule } from 'src/payment/payment.module';



@Module({
    imports: [TypeOrmModule.forFeature([Sale, SaleItem, Client ]), RemitoModule, PaymentModule],

  controllers: [SalesController, PosController],
  providers: [SalesService],
  exports: [SalesService]
})
export class SaleModule {}
