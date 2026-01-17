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
import { RemitoService } from 'src/remito/remito.service';

// @Injectable()
// export class PurchasesService {
//   constructor(
//     private readonly ds: DataSource,

//     @InjectRepository(Purchase)
//     private readonly purchaseRepo: Repository<Purchase>,

//     @InjectRepository(PurchaseItem)
//     private readonly itemRepo: Repository<PurchaseItem>,

//     @InjectRepository(Supplier)
//     private readonly supplierRepo: Repository<Supplier>,

//     @InjectRepository(SupplierAccountEntry)
//     private readonly saeRepo: Repository<SupplierAccountEntry>,
//     private readonly remitoService: RemitoService,
//   ) {}

//   /* =========================
//      Crear compra (DRAFT)
//      NO impacta deuda
//   ========================== */
//  async create(dto: CreatePurchaseDto) {
//   // 1️⃣ Buscar proveedor
//   const supplier = await this.supplierRepo.findOneByOrFail({
//     id: dto.supplierId,
//   });

//   // 2️⃣ Crear ítems (conversión number → string)
//   const items: PurchaseItem[] = dto.items.map(itemDto => {
//     const lineTotal =
//       Number(itemDto.qty) * Number(itemDto.unitCost);

//     return this.itemRepo.create({
//       description: itemDto.description,
//       qty: itemDto.qty.toString(),
//       unitCost: itemDto.unitCost.toString(),
//       lineTotal: lineTotal.toString(),
//       productId: itemDto.productId,
//     });
//   });

//   // 3️⃣ Calcular total de la compra
//   const totalAmount = items.reduce(
//     (sum, item) => sum + Number(item.lineTotal),
//     0,
//   );

//   // 4️⃣ Crear compra (siempre DRAFT)
//   const purchase = this.purchaseRepo.create({
//     supplier,
//     status: PurchaseStatus.DRAFT,
//     totalAmount,
//     items,
//   });

//   // 5️⃣ Guardar todo (cascade guarda items)
//   return this.purchaseRepo.save(purchase);
// }


//   /* =========================
//      Confirmar compra
//      Impacta deuda + asiento
//   ========================== */
//   // async confirm(id: string): Promise<Purchase> {
//   //   return this.ds.transaction(async manager => {
//   //     const purchase = await manager.findOne(Purchase, {
//   //       where: { id },
//   //       relations: { supplier: true },
//   //     });

//   //     if (!purchase) {
//   //       throw new NotFoundException('Compra no encontrada');
//   //     }

//   //     if (purchase.status !== PurchaseStatus.DRAFT) {
//   //       return purchase;
//   //     }

//   //     // 1️⃣ Confirmar compra
//   //     purchase.status = PurchaseStatus.CONFIRMED;
//   //     purchase.confirmedAt = new Date();
//   //     await manager.save(purchase);

//   //     // 2️⃣ Actualizar deuda del proveedor
//   //     const supplier = purchase.supplier;
//   //     supplier.totalDebtCache =
//   //       Number(supplier.totalDebtCache) +
//   //       Number(purchase.totalAmount);

//   //     await manager.save(supplier);

//   //     // 3️⃣ Asiento contable
//   //     const entry = manager.create(SupplierAccountEntry, {
//   //       supplier,
//   //       purchase,
//   //       type: SupplierAccountEntryType.DEBT,
//   //       amount: purchase.totalAmount,
//   //       balanceAfter: supplier.totalDebtCache,
//   //     });

//   //     await manager.save(entry);

//   //     return purchase;
//   //   });
//   // }

//   //REF
//  async confirm(id: string): Promise<any> {
//   return this.ds.transaction(async manager => {
//     const purchase = await manager.findOne(Purchase, {
//       where: { id },
//       relations: { supplier: true, items: true },
//     });

//     if (!purchase) {
//       throw new NotFoundException('Compra no encontrada');
//     }

//     if (purchase.status === PurchaseStatus.CONFIRMED) {
//       // Si ya estaba confirmada, podrías devolver el purchase o lanzar error.
//       // Para mantener coherencia, devolvemos el purchase sin hacer nada.
//       return purchase;
//     }

//     if (purchase.status !== PurchaseStatus.DRAFT) {
//       throw new BadRequestException(
//         'Solo se pueden confirmar compras en estado DRAFT',
//       );
//     }

//     // =========================
//     // 1️⃣ CONFIRMAR COMPRA
//     // =========================
//     purchase.status = PurchaseStatus.CONFIRMED;
//     purchase.confirmedAt = new Date();
//     await manager.save(purchase);

//     // =========================
//     // 2️⃣ ACTUALIZAR DEUDA
//     // =========================
//     const supplier = purchase.supplier;
//     const previousBalance = Number(supplier.totalDebtCache);
//     const newBalance =
//       previousBalance + Number(purchase.totalAmount);

//     supplier.totalDebtCache = newBalance;
//     await manager.save(supplier);

//     // =========================
//     // 3️⃣ ASIENTO CONTABLE (DEBT)
//     // =========================
//     const entry = manager.create(SupplierAccountEntry, {
//       supplier,
//       purchase,
//       type: SupplierAccountEntryType.DEBT,
//       amount: Number(purchase.totalAmount),
//       balanceAfter: newBalance,
//       description: `Compra confirmada #${purchase.id}`,
//       status: 'ACTIVE',
//     });

//     await manager.save(entry);

//     // =========================
//     // 4️⃣ ARMAMOS SNAPSHOT (ÚNICO)
//     // =========================

//     const compraTotal = Number(purchase.totalAmount);
//     const entrega = 0; // hoy siempre 0 al confirmar
//     const saldoCompra = compraTotal - entrega;
//     const saldoAnterior = previousBalance;
//     const saldoTotal = newBalance;

//     const snapshot = {
//       id: purchase.id,
//       type: 'PURCHASE_CONFIRMED',
//       date: new Date(),

//       purchase: {
//         id: purchase.id,
//         status: purchase.status,
//         totalAmount: compraTotal.toFixed(2),
//         items: purchase.items.map(item => ({
//           id: item.id,
//           description: item.description,
//           qty: item.qty,
//           unitCost: Number(item.unitCost).toFixed(2),
//           lineTotal: Number(item.lineTotal).toFixed(2),
//         })),
//       },

//       supplier: {
//         id: supplier.id,
//         name: supplier.name,
//         totalDebtCache: saldoTotal.toFixed(2),
//       },

//       summary: {
//         compraTotal: compraTotal.toFixed(2),
//         entrega: entrega.toFixed(2),
//         saldoCompra: saldoCompra.toFixed(2),
//         saldoAnterior: saldoAnterior.toFixed(2),
//         saldoTotal: saldoTotal.toFixed(2),
//       },
//     };

//     // =========================
//     // 5️⃣ GUARDAMOS REMITO (UNA SOLA VEZ)
//     // =========================
//     await this.remitoService.create({
//       type: 'PURCHASE_CONFIRMED',
//       purchaseId: purchase.id,
//       clientId: supplier.id, // por ahora mantenemos esto para que compile
//       snapshot,
//     });

//     // =========================
//     // 6️⃣ DEVOLVEMOS AL FRONT
//     // =========================
//     return snapshot;
//   });
// }




//   /* =========================
//      Eliminar compra (solo DRAFT)
//   ========================== */
//   async remove(id: string): Promise<void> {
//     const purchase = await this.purchaseRepo.findOne({
//       where: { id },
//     });

//     if (!purchase) {
//       throw new NotFoundException('Compra no encontrada');
//     }

//     if (purchase.status !== PurchaseStatus.DRAFT) {
//       throw new BadRequestException(
//         'Solo se pueden eliminar compras en estado DRAFT',
//       );
//     }

//     await this.purchaseRepo.remove(purchase);
//   }

//   /* =========================
//      Listar compras
//   ========================== */
//   async list(params?: {
//     supplierId?: string;
//     status?: PurchaseStatus;
//   }): Promise<Purchase[]> {
//     return this.purchaseRepo.find({
//       where: {
//         ...(params?.supplierId
//           ? { supplier: { id: params.supplierId } }
//           : {}),
//         ...(params?.status ? { status: params.status } : {}),
//       },
//       relations: ['items', 'supplier'],
//       order: { createdAt: 'DESC' },
//     });
//   }
// }


//ref
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

    private readonly remitoService: RemitoService,
  ) {}

  /* ==================================================
     CREAR COMPRA (DRAFT)
     - Calcula totales en backend
     - No impacta deuda
  =================================================== */
  async create(dto: CreatePurchaseDto): Promise<Purchase> {
    // 1) Buscar proveedor
    const supplier = await this.supplierRepo.findOneByOrFail({
      id: dto.supplierId,
    });

    // 2) Crear items calculando lineTotal
    const items = dto.items.map(itemDto => {
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

    // 3) Calcular total de la compra
    const totalAmount = items.reduce(
      (sum, item) => sum + Number(item.lineTotal),
      0,
    );

    // 4) Crear compra en DRAFT
    const purchase = this.purchaseRepo.create({
      supplier,
      status: PurchaseStatus.DRAFT,
      totalAmount,
      items,
    });

    // 5) Guardar (cascade guarda los items)
    return this.purchaseRepo.save(purchase);
  }

  /* ==================================================
     CONFIRMAR COMPRA
     - Cambia estado
     - Actualiza deuda
     - Genera asiento
     - Genera remito con snapshot
     - Devuelve snapshot al front
  =================================================== */
  async confirm(id: string): Promise<any> {
    return this.ds.transaction(async manager => {
      const purchase = await manager.findOne(Purchase, {
        where: { id },
        relations: { supplier: true, items: true },
      });

      if (!purchase) {
        throw new NotFoundException('Compra no encontrada');
      }

      if (purchase.status === PurchaseStatus.CONFIRMED) {
        return purchase;
      }

      if (purchase.status !== PurchaseStatus.DRAFT) {
        throw new BadRequestException(
          'Solo se pueden confirmar compras en estado DRAFT',
        );
      }

      // =========================
      // 1) CONFIRMAR COMPRA
      // =========================
      purchase.status = PurchaseStatus.CONFIRMED;
      purchase.confirmedAt = new Date();
      await manager.save(purchase);

      // =========================
      // 2) ACTUALIZAR DEUDA
      // =========================
      const supplier = purchase.supplier;
      const previousBalance = Number(supplier.totalDebtCache);
      const newBalance =
        previousBalance + Number(purchase.totalAmount);

      supplier.totalDebtCache = newBalance;
      await manager.save(supplier);

      // =========================
      // 3) ASIENTO CONTABLE (DEBT)
      // =========================
      const entry = manager.create(SupplierAccountEntry, {
        supplier,
        purchase,
        type: SupplierAccountEntryType.DEBT,
        amount: Number(purchase.totalAmount),
        balanceAfter: newBalance,
        description: `Compra confirmada #${purchase.id}`,
        status: 'ACTIVE',
      });

      await manager.save(entry);

      // =========================
      // 4) ARMAR SNAPSHOT (ÚNICO Y LIMPIO)
      // =========================
      const compraTotal = Number(purchase.totalAmount);
      const entrega = 0; // al confirmar siempre 0
      const saldoCompra = compraTotal - entrega;
      const saldoAnterior = previousBalance;
      const saldoTotal = newBalance;

      const snapshot = {
        id: purchase.id,
        type: 'PURCHASE_CONFIRMED',
        date: new Date(),

        purchase: {
          id: purchase.id,
          status: purchase.status,
          totalAmount: compraTotal.toFixed(2),
          items: purchase.items.map(item => ({
            id: item.id,
            description: item.description,
            qty: item.qty,
            unitCost: Number(item.unitCost).toFixed(2),
            lineTotal: Number(item.lineTotal).toFixed(2),
          })),
        },

        supplier: {
          id: supplier.id,
          name: supplier.name,
          totalDebtCache: saldoTotal.toFixed(2),
        },

        summary: {
          compraTotal: compraTotal.toFixed(2),
          entrega: entrega.toFixed(2),
          saldoCompra: saldoCompra.toFixed(2),
          saldoAnterior: saldoAnterior.toFixed(2),
          saldoTotal: saldoTotal.toFixed(2),
        },
      };

      // =========================
      // 5) GUARDAR REMITO
      // =========================
      await this.remitoService.create({
  type: 'PURCHASE_CONFIRMED',
  purchaseId: purchase.id,
  supplierId: supplier.id, // ✅ BIEN
  snapshot,
});

      // =========================
      // 6) RESPUESTA AL FRONT
      // =========================
      return snapshot;
    });
  }

  /* ==================================================
     ELIMINAR COMPRA (solo DRAFT)
  =================================================== */
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

  /* ==================================================
     LISTAR COMPRAS
  =================================================== */
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

  async confirmAndPay(id: string, entrega: number): Promise<any> {
  return this.ds.transaction(async manager => {
    const purchase = await manager.findOne(Purchase, {
      where: { id },
      relations: { supplier: true, items: true },
    });

    if (!purchase) {
      throw new NotFoundException('Compra no encontrada');
    }

    if (purchase.status !== PurchaseStatus.DRAFT) {
      throw new BadRequestException(
        'Solo se puede confirmar y pagar una compra en estado DRAFT',
      );
    }

    // 🔹 NORMALIZAMOS ENTREGA (EVITA NaN)
    entrega = Number(entrega ?? 0);

    // =========================
    // 1️⃣ CONFIRMAR COMPRA
    // =========================
    purchase.status = PurchaseStatus.CONFIRMED;
    purchase.confirmedAt = new Date();
    await manager.save(purchase);

    const supplier = purchase.supplier;
    const previousBalance = Number(supplier.totalDebtCache);
    const compraTotal = Number(purchase.totalAmount);

    // =========================
    // 2️⃣ CALCULAR SALDOS CON PAGO
    // =========================
    const newBalance = previousBalance + compraTotal - entrega;
    const saldoCompra = compraTotal - entrega;

    supplier.totalDebtCache = newBalance;
    await manager.save(supplier);

    // =========================
    // 3️⃣ ASIENTO DE DEUDA POR LA COMPRA
    // =========================
    const debtEntry = manager.create(SupplierAccountEntry, {
      supplier,
      purchase,
      type: SupplierAccountEntryType.DEBT,
      amount: compraTotal,
      balanceAfter: previousBalance + compraTotal,
      description: `Compra confirmada #${purchase.id}`,
      status: 'ACTIVE',
    });

    await manager.save(debtEntry);

    // =========================
    // 4️⃣ SI HAY ENTREGA → ASIENTO DE PAGO
    // =========================
    if (entrega > 0) {
      const paymentEntry = manager.create(SupplierAccountEntry, {
        supplier,
        purchase,
        type: SupplierAccountEntryType.PAYMENT,
        amount: entrega,
        balanceAfter: newBalance,
        description: `Pago al confirmar compra #${purchase.id}`,
        status: 'ACTIVE',
      });

      await manager.save(paymentEntry);
    }

    // =========================
    // 5️⃣ ARMAMOS SNAPSHOT (TIPO POS)
    // =========================
    const snapshot = {
      id: purchase.id,
      type: 'PURCHASE_CONFIRMED', // ✅ válido para Remito
      date: new Date(),

      purchase: {
        id: purchase.id,
        status: purchase.status,
        totalAmount: compraTotal.toFixed(2),
        items: purchase.items.map(item => ({
          id: item.id,
          description: item.description,
          qty: item.qty,
          unitCost: Number(item.unitCost).toFixed(2),
          lineTotal: Number(item.lineTotal).toFixed(2),
        })),
      },

      supplier: {
        id: supplier.id,
        name: supplier.name,
        totalDebtCache: newBalance.toFixed(2),
      },

      summary: {
        compraTotal: compraTotal.toFixed(2),
        entrega: entrega.toFixed(2),
        saldoCompra: saldoCompra.toFixed(2),
        saldoAnterior: previousBalance.toFixed(2),
        saldoTotal: newBalance.toFixed(2),
      },
    };

    // =========================
    // 6️⃣ GUARDAMOS REMITO
    // =========================
  await this.remitoService.create({
  type: 'PURCHASE_CONFIRMED',
  supplierId: supplier.id,   // 👈 ACÁ ESTÁ LA CLAVE
  snapshot,
});


    // =========================
    // 7️⃣ RESPUESTA AL FRONT (POS)
    // =========================
    return snapshot;
  });
}



}
