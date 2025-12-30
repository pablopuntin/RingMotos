// import {
//   Injectable,
//   NotFoundException,
//   ConflictException
// } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository, DataSource } from 'typeorm';
// import { Sale } from './entities/sale.entity';
// import { SaleItem } from 'src/sale-item/entities/sale-item.entity';
// import { Client } from 'src/client/entities/client.entity';
// import { CreateSaleDto } from './dto/create-sale.dto';
// import { AddSaleItemDto } from './dto/create-items.dto';
// import { AccountEntry } from 'src/acount-entry/entities/acount-entry.entity';
// import { RemitosService } from 'src/remito/remito.service';
// import { PaymentService } from 'src/payment/payment.service';
// import { CloseSaleDto } from './dto/close-sale.dto';

// @Injectable()
// export class SalesService {
//   constructor(
//     @InjectRepository(Sale)
//     private readonly saleRepo: Repository<Sale>,

//     @InjectRepository(SaleItem)
//     private readonly itemRepo: Repository<SaleItem>,

//     @InjectRepository(Client)
//     private readonly clientRepo: Repository<Client>,

//     private readonly dataSource: DataSource,

//     private readonly paymentService: PaymentService
//   ) {}

//   /* =========================
//      Reglas
//   ========================== */

//   private assertEditable(sale: Sale) {
//     if (sale.status === 'DRAFT') return;

//     if (
//       sale.status === 'CONFIRMED' &&
//       sale.paidAmount === 0 &&
//       !sale.remito
//     ) {
//       return;
//     }

//     throw new ConflictException(
//       'La venta no puede modificarse en su estado actual',
//     );
//   }

//   /* =========================
//      Crear venta
//   ========================== */

//   async create(dto: CreateSaleDto) {
//     const client = await this.clientRepo.findOne({
//       where: { id: dto.clientId },
//     });

//     if (!client) throw new NotFoundException('Cliente no encontrado');

//     const sale = this.saleRepo.create({
//       client,
//       status: 'DRAFT',
//       totalAmount: 0,
//       paidAmount: 0,
//     });

//     return this.saleRepo.save(sale);
//   }

//   /* =========================
//      Agregar ítem
//   ========================== */

//   async addItem(saleId: string, dto: AddSaleItemDto) {
//     return this.dataSource.transaction(async manager => {
//       const sale = await manager.findOne(Sale, {
//         where: { id: saleId },
//         relations: ['remito'],
//       });

//       if (!sale) throw new NotFoundException('Venta no encontrada');

//       this.assertEditable(sale);

//       const lineTotal = dto.qty * dto.unitPrice;

//       const item = manager.create(SaleItem, {
//         sale: { id: sale.id },
//         productId: dto.productId,
//         description: dto.description,
//         qty: dto.qty,
//         unitPrice: dto.unitPrice,
//         lineTotal,
//       });

//       await manager.save(SaleItem, item);

//       // 🔥 total consistente SIEMPRE
//       const { sum } = await manager
//         .createQueryBuilder(SaleItem, 'item')
//         .select('COALESCE(SUM(item.lineTotal), 0)', 'sum')
//         .where('item.saleId = :saleId', { saleId })
//         .getRawOne();

//       sale.totalAmount = Number(sum);
//       await manager.save(Sale, sale);

//       return item;
//     });
//   }

//   /* =========================
//      Quitar ítem
//   ========================== */

//   async removeItem(itemId: string) {
//     return this.dataSource.transaction(async manager => {
//       const item = await manager.findOne(SaleItem, {
//         where: { id: itemId },
//         relations: ['sale', 'sale.remito'],
//       });

//       if (!item) throw new NotFoundException('Ítem no encontrado');

//       this.assertEditable(item.sale);

//       await manager.remove(SaleItem, item);

//       const { sum } = await manager
//         .createQueryBuilder(SaleItem, 'item')
//         .select('COALESCE(SUM(item.lineTotal), 0)', 'sum')
//         .where('item.saleId = :saleId', { saleId: item.sale.id })
//         .getRawOne();

//       item.sale.totalAmount = Number(sum);
//       await manager.save(Sale, item.sale);

//       return { success: true };
//     });
//   }

//   /* =========================
//      Confirmar venta (SIN pago)
//   ========================== */

//   async confirm(id: string) {
//     return this.dataSource.transaction(async manager => {
//       const sale = await manager.findOne(Sale, {
//         where: { id },
//         relations: ['client'],
//       });

//       if (!sale) throw new NotFoundException('Venta no encontrada');

//       if (sale.status !== 'DRAFT') return sale;

//       const itemsCount = await manager.count(SaleItem, {
//         where: { sale: { id } },
//       });

//       if (itemsCount === 0) {
//         throw new ConflictException('La venta no tiene ítems');
//       }

//       sale.status = 'CONFIRMED';
//       sale.confirmedAt = new Date();
//       await manager.save(sale);

//       return sale;
//     });
//   }

//   /* =========================
//      Obtener ventas
//   ========================== */

//   findAll() {
//     return this.saleRepo.find({
//       relations: ['client'],
//       order: { createdAt: 'DESC' },
//     });
//   }

//   findOne(id: string) {
//     return this.saleRepo.findOne({
//       where: { id },
//       relations: ['client', 'items', 'paymentAllocations', 'remito'],
//     });
//   }

//   async closeSale(
//   saleId: string,
//   dto: CloseSaleDto,
// ) {
//   return this.dataSource.transaction(async manager => {
//     /* =====================
//        1️⃣ Venta
//     ====================== */
//     const sale = await manager.findOne(Sale, {
//       where: { id: saleId },
//       relations: ['client'],
//     });

//     if (!sale) {
//       throw new NotFoundException('Venta no encontrada');
//     }

//     /* =====================
//        2️⃣ Confirmar venta
//     ====================== */
//     if (sale.status === 'DRAFT') {
//       sale.status = 'CONFIRMED';
//       sale.confirmedAt = new Date();
//       await manager.save(sale);
//     }

//     const total = Number(sale.totalAmount);
//     const paid = Number(dto.amount ?? 0);

//     if (paid < 0) {
//       throw new ConflictException('Monto inválido');
//     }

//     if (paid > total) {
//       throw new ConflictException(
//         'El monto ingresado supera el total de la venta',
//       );
//     }

//     /* =====================
//        3️⃣ Pago (si hay)
//     ====================== */
//     // if (paid > 0) {
//     //   await this.paymentService.create({
//     //     amount: paid,
//     //     paymentMethod: dto.paymentMethod,
//     //     receivedBy: dto.receivedBy,
//     //     allocations: [
//     //       {
//     //         saleId: sale.id,
//     //         amount: paid,
//     //       },
//     //     ],
//     //   });
//     // }

//     //refactor
//     if (paid > 0) {
//   if (!dto.paymentMethod || !dto.receivedBy) {
//     throw new ConflictException(
//       'paymentMethod y receivedBy son obligatorios cuando hay pago',
//     );
//   }

//   await this.paymentService.create({
//     amount: paid,
//     paymentMethod: dto.paymentMethod,
//     receivedBy: dto.receivedBy,
//     allocations: [
//       { saleId: sale.id, amount: paid },
//     ],
//   });
// }

// if (!sale.client) {
//   throw new ConflictException('La venta no tiene cliente asociado');
// }

//     /* =====================
//        4️⃣ Cuenta corriente
//     ====================== */
//     const remaining = total - paid;

//     if (remaining > 0) {
//       const lastEntry = await manager.findOne(AccountEntry, {
//         where: { client: { id: sale.client.id } },
//         order: { createdAt: 'DESC' },
//       });

//       const previousBalance = Number(lastEntry?.balanceAfter ?? 0);
//       const newBalance = previousBalance + remaining;

//       await manager.save(
//         manager.create(AccountEntry, {
//           client: sale.client,
//           sale,
//           type: 'SALE',
//           amount: remaining,
//           balanceAfter: newBalance,
//           description: `Venta ${sale.id} a cuenta corriente`,
//           status: 'ACTIVE',
//         }),
//       );

//       sale.client.totalDebtCache = newBalance;
//       await manager.save(sale.client);
//     }

//     /* =====================
//        5️⃣ Refrescar venta
//     ====================== */
//     return this.findOne(sale.id);
//   });
// }

// }

//refactor
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import { Sale } from './entities/sale.entity';
import { SaleItem } from 'src/sale-item/entities/sale-item.entity';
import { Client } from 'src/client/entities/client.entity';
import { CreateSaleDto } from './dto/create-sale.dto';
import { AddSaleItemDto } from './dto/create-items.dto';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private readonly saleRepo: Repository<Sale>,

    @InjectRepository(SaleItem)
    private readonly itemRepo: Repository<SaleItem>,

    @InjectRepository(Client)
    private readonly clientRepo: Repository<Client>,

    private readonly dataSource: DataSource,
  ) {}

  /* =========================
     Reglas
  ========================== */

  private assertEditable(sale: Sale) {
    if (sale.status === 'DRAFT') return;

    if (
      sale.status === 'CONFIRMED' &&
      sale.paidAmount === 0 &&
      !sale.remito
    ) {
      return;
    }

    throw new ConflictException(
      'La venta no puede modificarse en su estado actual',
    );
  }

  /* =========================
     Crear venta
  ========================== */

  async create(dto: CreateSaleDto) {
    const client = await this.clientRepo.findOne({
      where: { id: dto.clientId },
    });

    if (!client) {
      throw new NotFoundException('Cliente no encontrado');
    }

    const sale = this.saleRepo.create({
      client,
      status: 'DRAFT',
      totalAmount: 0,
      paidAmount: 0,
    });

    return this.saleRepo.save(sale);
  }

  /* =========================
     Agregar ítem
  ========================== */

  async addItem(saleId: string, dto: AddSaleItemDto) {
    return this.dataSource.transaction(async manager => {
      const sale = await manager.findOne(Sale, {
        where: { id: saleId },
        relations: ['remito'],
      });

      if (!sale) {
        throw new NotFoundException('Venta no encontrada');
      }

      this.assertEditable(sale);

      const lineTotal = dto.qty * dto.unitPrice;

      const item = manager.create(SaleItem, {
        sale: { id: sale.id },
        productId: dto.productId,
        description: dto.description,
        qty: dto.qty,
        unitPrice: dto.unitPrice,
        lineTotal,
      });

      await manager.save(item);

      const { sum } = await manager
        .createQueryBuilder(SaleItem, 'item')
        .select('COALESCE(SUM(item.lineTotal), 0)', 'sum')
        .where('item.saleId = :saleId', { saleId })
        .getRawOne();

      sale.totalAmount = Number(sum);
      await manager.save(sale);

      return item;
    });
  }

  /* =========================
     Quitar ítem
  ========================== */

  async removeItem(itemId: string) {
    return this.dataSource.transaction(async manager => {
      const item = await manager.findOne(SaleItem, {
        where: { id: itemId },
        relations: ['sale', 'sale.remito'],
      });

      if (!item) {
        throw new NotFoundException('Ítem no encontrado');
      }

      this.assertEditable(item.sale);

      await manager.remove(item);

      const { sum } = await manager
        .createQueryBuilder(SaleItem, 'item')
        .select('COALESCE(SUM(item.lineTotal), 0)', 'sum')
        .where('item.saleId = :saleId', {
          saleId: item.sale.id,
        })
        .getRawOne();

      item.sale.totalAmount = Number(sum);
      await manager.save(item.sale);

      return { success: true };
    });
  }

  /* =========================
     Confirmar venta (SIN pagos)
  ========================== */

  async confirm(id: string) {
    return this.dataSource.transaction(async manager => {
      const sale = await manager.findOne(Sale, {
        where: { id },
      });

      if (!sale) {
        throw new NotFoundException('Venta no encontrada');
      }

      if (sale.status !== 'DRAFT') {
        return sale;
      }

      const itemsCount = await manager.count(SaleItem, {
        where: { sale: { id } },
      });

      if (itemsCount === 0) {
        throw new ConflictException(
          'La venta no tiene ítems',
        );
      }

      sale.status = 'CONFIRMED';
      sale.confirmedAt = new Date();

      return manager.save(sale);
    });
  }

  /* =========================
     Obtener ventas
  ========================== */

  // findAll() {
  //   return this.saleRepo.find({
  //     relations: ['client'],
  //     order: { createdAt: 'DESC' }
  //   });
  // }

  //con items
  findAll() {
  return this.saleRepo.find({
    relations: [
      'client',
      'items',
      'paymentAllocations',
      'remito'
    ],
    order: { createdAt: 'DESC' }
  });
}


  findOne(id: string) {
    return this.saleRepo.findOne({
      where: { id },
      relations: [
        'client',
        'items',
        'paymentAllocations',
        'remito'
      ]
    });
  }
}
