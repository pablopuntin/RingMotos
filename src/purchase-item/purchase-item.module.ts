import { Module } from '@nestjs/common';
import { PurchaseItemService } from './purchase-item.service';
import { PurchaseItemController } from './purchase-item.controller';
import { PurchaseItem } from './entities/purchase-item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseItem])],
  controllers: [PurchaseItemController],
  providers: [PurchaseItemService],
})
export class PurchaseItemModule {}
