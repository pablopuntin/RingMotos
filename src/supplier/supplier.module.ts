import { Module } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { SuppliersController } from './supplier.controller';
import { Supplier } from './entities/supplier.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Supplier])],
  controllers: [SuppliersController],
  providers: [SupplierService],
})
export class SupplierModule {}
