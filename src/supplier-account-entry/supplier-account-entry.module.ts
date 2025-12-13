import { Module } from '@nestjs/common';
import { SupplierAccountEntryService } from './supplier-account-entry.service';
import { SupplierAccountEntryController } from './supplier-account-entry.controller';
import { SupplierAccountEntry } from './entities/supplier-account-entry.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SupplierAccountEntry])],
  controllers: [SupplierAccountEntryController],
  providers: [SupplierAccountEntryService],
})
export class SupplierAccountEntryModule {}
