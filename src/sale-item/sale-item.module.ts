import { Module } from '@nestjs/common';
import { SaleItemService } from './sale-item.service';
import { SaleItemController } from './sale-item.controller';
import { SaleItem } from './entities/sale-item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from 'src/sale/entities/sale.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SaleItem, Sale])],
  controllers: [SaleItemController],
  providers: [SaleItemService],
})
export class SaleItemModule {}
