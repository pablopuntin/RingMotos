// supplier-account-entries/supplier-account-entries.service.ts
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import {
  SupplierAccountEntry,
  SupplierAccountEntryType,
} from './entities/supplier-account-entry.entity';

@Injectable()
export class SupplierAccountEntriesService {
  constructor(
    private readonly ds: DataSource,
    @InjectRepository(Supplier) private readonly supplierRepo: Repository<Supplier>,
    @InjectRepository(SupplierAccountEntry) private readonly saeRepo: Repository<SupplierAccountEntry>,
  ) {}

  async createAdjustment(supplierId: string, amount: number, description?: string) {
    return this.ds.transaction(async manager => {
      const supplier = await manager.findOneByOrFail(Supplier, { id: supplierId });

      // ✅ todo en number
      const newBalance = supplier.totalDebtCache + amount;
      supplier.totalDebtCache = Math.max(newBalance, 0);
      await manager.save(supplier);

      const entry = manager.create(SupplierAccountEntry, {
        supplier,
        type: SupplierAccountEntryType.ADJUSTMENT,
        amount,
        balanceAfter: supplier.totalDebtCache,
        description: description ?? 'Ajuste manual',
      });

      return manager.save(entry);
    });
  }

  async listBySupplier(supplierId: string) {
    return this.saeRepo.find({
      where: { supplier: { id: supplierId } },
      order: { createdAt: 'DESC' },
    });
  }
}
