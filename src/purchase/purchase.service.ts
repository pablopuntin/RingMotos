// purchases/purchases.service.ts
// import { Injectable } from '@nestjs/common';
// import { DataSource, Repository } from 'typeorm';
// import { InjectRepository } from '@nestjs/typeorm';
// import { PurchaseStatus } from './entities/purchase.entity';
// import { Purchase } from './entities/purchase.entity';
// import { PurchaseItem } from 'src/purchase-item/entities/purchase-item.entity';
// import { Supplier } from 'src/supplier/entities/supplier.entity';
// import { SupplierAccountEntry } from 'src/supplier-account-entry/entities/supplier-account-entry.entity';
// import { SupplierAccountEntryType } from 'src/supplier-account-entry/entities/supplier-account-entry.entity';

// @Injectable()
// export class PurchasesService {
//   constructor(
//     private readonly ds: DataSource,
//     @InjectRepository(Purchase) private readonly purchaseRepo: Repository<Purchase>,
//     @InjectRepository(PurchaseItem) private readonly itemRepo: Repository<PurchaseItem>,
//     @InjectRepository(Supplier) private readonly supplierRepo: Repository<Supplier>,
//     @InjectRepository(SupplierAccountEntry) private readonly saeRepo: Repository<SupplierAccountEntry>,
//   ) {}

//   async create(dto: { supplierId: string; items: { description: string; qty: number; unitCost: number; productId?: string }[] }) {
//     const supplier = await this.supplierRepo.findOneByOrFail({ id: dto.supplierId });

//     const items = dto.items.map(i => {
//       const lineTotal = Number(i.qty) * Number(i.unitCost);
//       return this.itemRepo.create({ description: i.description, qty: String(i.qty), unitCost: String(i.unitCost), lineTotal: String(lineTotal), productId: i.productId });
//     });

//     const totalAmount = items.reduce((sum, i) => sum + Number(i.lineTotal), 0);

//     const purchase = this.purchaseRepo.create({ supplier, items, totalAmount: totalAmount, status: PurchaseStatus.DRAFT });
//     return this.purchaseRepo.save(purchase);
//   }

//   async confirm(purchaseId: string) {
//     return this.ds.transaction(async manager => {
//       const purchase = await manager.findOne(Purchase, { where: { id: purchaseId }, relations: { items: true, supplier: true } });
//       if (!purchase) throw new Error('Purchase not found');
//       if (purchase.status !== PurchaseStatus.DRAFT) throw new Error('Only DRAFT can be confirmed');

//       purchase.status = PurchaseStatus.CONFIRMED;
//       purchase.confirmedAt = new Date();
//       await manager.save(purchase);

//       const supplier = purchase.supplier;
//       const newBalance = Number(supplier.totalDebtCache) + Number(purchase.totalAmount);
//       supplier.totalDebtCache = Math.max(newBalance, 0);

//       await manager.save(supplier);

//    const entry: SupplierAccountEntry = manager.create(SupplierAccountEntry, {
//   supplier,
//   purchase,
//   type: SupplierAccountEntryType.DEBT,
//   amount: purchase.totalAmount,
//   balanceAfter: newBalance,
// });

// await manager.save(entry);

//       return purchase;
//     });
//   }

//   async list(params?: { supplierId?: string; status?: PurchaseStatus }) {
//     return this.purchaseRepo.find({
//       where: { ...(params?.supplierId ? { supplier: { id: params.supplierId } } : {}), ...(params?.status ? { status: params.status } : {}) },
//       relations: ['items', 'supplier'],
//       order: { createdAt: 'DESC' },
//     });
//   }
// }


//ref
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Purchase, PurchaseStatus } from './entities/purchase.entity';
import { PurchaseItem } from 'src/purchase-item/entities/purchase-item.entity';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import {
  SupplierAccountEntry,
  SupplierAccountEntryType,
} from 'src/supplier-account-entry/entities/supplier-account-entry.entity';

import { CreatePurchaseDto } from './dto/create-purchase.dto';

@Injectable()
export class PurchasesService {
  constructor(
    private readonly ds: DataSource,

    @InjectRepository(Purchase)
    private readonly purchaseRepo: Repository<Purchase>,

    @InjectRepository(PurchaseItem)
    private readonly itemRepo: Repository<PurchaseItem>,

    @InjectRepository(Supplier)
    private readonly supplierRepo: Repository<Supplier>,

    @InjectRepository(SupplierAccountEntry)
    private readonly saeRepo: Repository<SupplierAccountEntry>,
  ) {}

  /* =========================
     Crear compra (DRAFT)
     NO impacta deuda
  ========================== */
 async create(dto: CreatePurchaseDto) {
  // 1️⃣ Buscar proveedor
  const supplier = await this.supplierRepo.findOneByOrFail({
    id: dto.supplierId,
  });

  // 2️⃣ Crear ítems (conversión number → string)
  const items: PurchaseItem[] = dto.items.map(itemDto => {
    const lineTotal =
      Number(itemDto.qty) * Number(itemDto.unitCost);

    return this.itemRepo.create({
      description: itemDto.description,
      qty: itemDto.qty.toString(),
      unitCost: itemDto.unitCost.toString(),
      lineTotal: lineTotal.toString(),
      productId: itemDto.productId,
    });
  });

  // 3️⃣ Calcular total de la compra
  const totalAmount = items.reduce(
    (sum, item) => sum + Number(item.lineTotal),
    0,
  );

  // 4️⃣ Crear compra (siempre DRAFT)
  const purchase = this.purchaseRepo.create({
    supplier,
    status: PurchaseStatus.DRAFT,
    totalAmount,
    items,
  });

  // 5️⃣ Guardar todo (cascade guarda items)
  return this.purchaseRepo.save(purchase);
}


  /* =========================
     Confirmar compra
     Impacta deuda + asiento
  ========================== */
  async confirm(id: string): Promise<Purchase> {
    return this.ds.transaction(async manager => {
      const purchase = await manager.findOne(Purchase, {
        where: { id },
        relations: { supplier: true },
      });

      if (!purchase) {
        throw new NotFoundException('Compra no encontrada');
      }

      if (purchase.status !== PurchaseStatus.DRAFT) {
        return purchase;
      }

      // 1️⃣ Confirmar compra
      purchase.status = PurchaseStatus.CONFIRMED;
      purchase.confirmedAt = new Date();
      await manager.save(purchase);

      // 2️⃣ Actualizar deuda del proveedor
      const supplier = purchase.supplier;
      supplier.totalDebtCache =
        Number(supplier.totalDebtCache) +
        Number(purchase.totalAmount);

      await manager.save(supplier);

      // 3️⃣ Asiento contable
      const entry = manager.create(SupplierAccountEntry, {
        supplier,
        purchase,
        type: SupplierAccountEntryType.DEBT,
        amount: purchase.totalAmount,
        balanceAfter: supplier.totalDebtCache,
      });

      await manager.save(entry);

      return purchase;
    });
  }

  /* =========================
     Eliminar compra (solo DRAFT)
  ========================== */
  async remove(id: string): Promise<void> {
    const purchase = await this.purchaseRepo.findOne({
      where: { id },
    });

    if (!purchase) {
      throw new NotFoundException('Compra no encontrada');
    }

    if (purchase.status !== PurchaseStatus.DRAFT) {
      throw new BadRequestException(
        'Solo se pueden eliminar compras en estado DRAFT',
      );
    }

    await this.purchaseRepo.remove(purchase);
  }

  /* =========================
     Listar compras
  ========================== */
  async list(params?: {
    supplierId?: string;
    status?: PurchaseStatus;
  }): Promise<Purchase[]> {
    return this.purchaseRepo.find({
      where: {
        ...(params?.supplierId
          ? { supplier: { id: params.supplierId } }
          : {}),
        ...(params?.status ? { status: params.status } : {}),
      },
      relations: ['items', 'supplier'],
      order: { createdAt: 'DESC' },
    });
  }
}
