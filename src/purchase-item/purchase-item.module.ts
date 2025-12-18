import { Module } from '@nestjs/common';
import { PurchaseItemService } from './purchase-item.service';
import { PurchaseItemController } from './purchase-item.controller';
import { PurchaseItem } from './entities/purchase-item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from 'src/purchase/entities/purchase.entity';
import { Supplier } from 'src/supplier/entities/supplier.entity';


@Module({
  imports: [TypeOrmModule.forFeature([PurchaseItem, Purchase, Supplier])],
  controllers: [PurchaseItemController],
  providers: [PurchaseItemService],
})
export class PurchaseItemModule {}
