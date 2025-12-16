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

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private readonly saleRepo: Repository<Sale>,

    @InjectRepository(SaleItem)
    private readonly itemRepo: Repository<SaleItem>,

    @InjectRepository(Client)
    private readonly clientRepo: Repository<Client>,

    private readonly dataSource: DataSource
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

      sale.totalAmount += lineTotal;
      await manager.save(sale);

      return item;
    });
  }

  /* =========================
     Confirmar venta
  ========================== */

  async confirm(id: string) {
    return this.dataSource.transaction(async manager => {
      const sale = await manager.findOne(Sale, {
        where: { id },
        relations: ['items', 'client'],
      });

      if (!sale) throw new NotFoundException('Venta no encontrada');

      if (sale.status !== 'DRAFT') {
        throw new ConflictException('La venta no está en borrador');
      }

      if (!sale.items || sale.items.length === 0) {
        throw new ConflictException('La venta no tiene ítems');
      }

      sale.status = 'CONFIRMED';
      sale.confirmedAt = new Date();

      // 🔴 ACÁ VA:
      // - account_entry (CHARGE)
      // - actualizar client.totalDebtCache

      await manager.save(sale);
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

      // 🔴 Si estaba CONFIRMED, acá va el AJUSTE negativo
      // account_entry ADJUSTMENT (-totalAmount)

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
