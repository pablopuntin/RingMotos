import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { SalesController } from './sale.controller';
import { SalesService } from './sale.service';
import { SaleItem } from 'src/sale-item/entities/sale-item.entity';
import { Client } from 'src/client/entities/client.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Sale, SaleItem, Client ])],

  controllers: [SalesController],
  providers: [SalesService]
})
export class SaleModule {}
