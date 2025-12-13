import { Module } from '@nestjs/common';
import { SaleItemService } from './sale-item.service';
import { SaleItemController } from './sale-item.controller';
import { SaleItem } from './entities/sale-item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SaleItem])],
  controllers: [SaleItemController],
  providers: [SaleItemService],
})
export class SaleItemModule {}
