import {
  Injectable,
  NotFoundException,
  ConflictException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Sale } from './entities/sale.entity';
import { SaleItem } from 'src/sale-item/entities/sale-item.entity';
import { Client } from 'src/client/entities/client.entity';
import { CreateSaleDto } from './dto/create-sale.dto';
import { AddSaleItemDto } from './dto/create-items.dto';
import { AccountEntry } from 'src/acount-entry/entities/acount-entry.entity';
import { RemitosService } from 'src/remito/remito.service';

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
    private readonly remitosService: RemitosService,
  ) {}

  /* =========================
     Helpers de reglas
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

    if (!client) throw new NotFoundException('Cliente no encontrado');

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
        relations: ['items', 'remito'],
      });

      if (!sale) throw new NotFoundException('Venta no encontrada');

      this.assertEditable(sale);

      const lineTotal = dto.qty * dto.unitPrice;

      const item = manager.create(SaleItem, {
        sale,
        productId: dto.productId,
        description: dto.description,
        qty: dto.qty,
        unitPrice: dto.unitPrice,
        lineTotal,
      });

      await manager.save(item);

      sale.totalAmount = Number(sale.totalAmount) + lineTotal;

      await manager.save(sale);

      return item;
    });
  }

  /* =========================
     Confirmar venta
  ========================== */

//   async confirm(id: string) {
//   return this.dataSource.transaction(async manager => {
//     const sale = await manager.findOne(Sale, {
//       where: { id },
//       relations: ['items', 'client'],
//     });

//     if (!sale) throw new NotFoundException('Venta no encontrada');

//     if (sale.status !== 'DRAFT') {
//       throw new ConflictException('La venta no está en borrador');
//     }

//     if (!sale.items || sale.items.length === 0) {
//       throw new ConflictException('La venta no tiene ítems');
//     }

//     // 1️⃣ confirmar venta
//     sale.status = 'CONFIRMED';
//     sale.confirmedAt = new Date();
//     await manager.save(sale);

//     // 2️⃣ obtener último balance del cliente
//     const lastEntry = await manager.findOne(AccountEntry, {
//       where: { client: { id: sale.client.id } },
//       order: { createdAt: 'DESC' },
//     });

//     const lastBalance = lastEntry ? Number(lastEntry.balanceAfter) : 0;
//     const newBalance = lastBalance + Number(sale.totalAmount);

//     // 3️⃣ crear CHARGE
//     const entry = manager.create(AccountEntry, {
//       client: sale.client,
//       type: 'CHARGE',
//       sale,
//       amount: sale.totalAmount,
//       balanceAfter: newBalance,
//       description: `Venta confirmada ${sale.id}`,
//       status: 'ACTIVE',
//     });

//     await manager.save(entry);

//     // 4️⃣ cache del cliente
//     sale.client.totalDebtCache = newBalance;
//     await manager.save(sale.client);

//     return sale;
//   });
// }

//refactor porque no relacionaba items
async confirm(id: string) {
  return this.dataSource.transaction(async manager => {
    const sale = await manager.findOne(Sale, {
      where: { id },
      relations: ['client'],
    });

    if (!sale) throw new NotFoundException('Venta no encontrada');

    if (sale.status !== 'DRAFT') {
      throw new ConflictException('La venta no está en borrador');
    }

    // ✅ VALIDACIÓN REAL
    const itemsCount = await manager.count(SaleItem, {
      where: { sale: { id } },
    });

    if (itemsCount === 0) {
      throw new ConflictException('La venta no tiene ítems');
    }

    sale.status = 'CONFIRMED';
    sale.confirmedAt = new Date();
    await manager.save(sale);

    // balance cliente
    const lastEntry = await manager.findOne(AccountEntry, {
      where: { client: { id: sale.client.id } },
      order: { createdAt: 'DESC' },
    });

    const lastBalance = lastEntry ? Number(lastEntry.balanceAfter) : 0;
    const newBalance = lastBalance + Number(sale.totalAmount);

    const entry = manager.create(AccountEntry, {
      client: sale.client,
      type: 'CHARGE',
      sale,
      amount: sale.totalAmount,
      balanceAfter: newBalance,
      description: `Venta confirmada ${sale.id}`,
      status: 'ACTIVE',
    });

    await manager.save(entry);

    sale.client.totalDebtCache = newBalance;
    await manager.save(sale.client);

    return sale;
  });
}


  /* =========================
     Cancelar venta (base para nota de crédito)
  ========================== */
async cancel(id: string) {
  return this.dataSource.transaction(async manager => {
    const sale = await manager.findOne(Sale, {
      where: { id },
      relations: ['client'],
    });

    if (!sale) throw new NotFoundException('Venta no encontrada');

    if (sale.status === 'CANCELLED') {
      throw new ConflictException('La venta ya está cancelada');
    }

    if (sale.paidAmount > 0) {
      throw new ConflictException(
        'La venta tiene pagos asociados. Se requiere nota de crédito.',
      );
    }

    // 🔴 si estaba CONFIRMED, revertimos deuda
    if (sale.status === 'CONFIRMED') {
      const lastEntry = await manager.findOne(AccountEntry, {
        where: { client: { id: sale.client.id } },
        order: { createdAt: 'DESC' },
      });

      const lastBalance = lastEntry ? Number(lastEntry.balanceAfter) : 0;
      const newBalance = lastBalance - Number(sale.totalAmount);

      const adjustment = manager.create(AccountEntry, {
        client: sale.client,
        type: 'ADJUSTMENT',
        sale,
        amount: sale.totalAmount,
        balanceAfter: newBalance,
        description: `Cancelación venta ${sale.id}`,
        status: 'ACTIVE',
      });

      await manager.save(adjustment);

      sale.client.totalDebtCache = newBalance;
      await manager.save(sale.client);
    }

    sale.status = 'CANCELLED';
    await manager.save(sale);

    return sale;
  });
}

  
  /* =========================
     Obtener ventas
  ========================== */

  findAll() {
    return this.saleRepo.find({
      relations: ['client'],
      order: { createdAt: 'DESC' },
    });
  }

  findOne(id: string) {
    return this.saleRepo.findOne({
      where: { id },
      relations: ['client', 'items', 'paymentAllocations', 'remito'],
    });
  }
}
