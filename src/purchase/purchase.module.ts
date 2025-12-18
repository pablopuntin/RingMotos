import { Module } from '@nestjs/common';
import { PurchasesService } from './purchase.service';
import { PurchasesController } from './purchase.controller';
import { Purchase } from './entities/purchase.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import { PurchaseItem } from 'src/purchase-item/entities/purchase-item.entity';
import { SupplierAccountEntry } from 'src/supplier-account-entry/entities/supplier-account-entry.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Purchase, Supplier, PurchaseItem, SupplierAccountEntry])],
  controllers: [PurchasesController],
  providers: [PurchasesService],
})
export class PurchaseModule {}
