import { Module } from '@nestjs/common';
import { SupplierAccountEntriesService } from './supplier-account-entry.service';
import { SupplierAccountEntriesController } from './supplier-account-entry.controller';
import { SupplierAccountEntry } from './entities/supplier-account-entry.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from 'src/supplier/entities/supplier.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SupplierAccountEntry, Supplier])],
  controllers: [SupplierAccountEntriesController],
  providers: [SupplierAccountEntriesService],
})
export class SupplierAccountEntryModule {}
