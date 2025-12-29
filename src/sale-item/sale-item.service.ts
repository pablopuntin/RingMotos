import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
//import { Repository, DataSource } from 'typeorm';
//import { SaleItem } from './entities/sale-item.entity';
//import { Sale } from 'src/sale/entities/sale.entity';
import { CreateSaleItemDto } from './dto/create-sale-item.dto';
import { SalesService } from 'src/sale/sale.service';

// @Injectable()
// export class SaleItemService {
//   constructor(
//     @InjectRepository(SaleItem)
//     private readonly itemRepo: Repository<SaleItem>,

//     @InjectRepository(Sale)
//     private readonly saleRepo: Repository<Sale>,

//     private readonly dataSource: DataSource,
//   ) {}

//   private assertEditable(sale: Sale) {
//     if (sale.status === 'DRAFT') return;

//     if (
//       sale.status === 'CONFIRMED' &&
//       sale.paidAmount === 0 &&
//       !sale.remito
//     ) {
//       return;
//     }

//     throw new ConflictException('La venta no puede modificarse');
//   }

//   async create(saleId: string, dto: CreateSaleItemDto) {
//     return this.dataSource.transaction(async manager => {
//       const sale = await manager.findOne(Sale, {
//         where: { id: saleId },
//         relations: ['items', 'remito'],
//       });

//       if (!sale) throw new NotFoundException('Venta no encontrada');

//       this.assertEditable(sale);

//       const lineTotal = dto.qty * dto.unitPrice;

//       const item = manager.create(SaleItem, {
//         sale,
//         //sale: { id: sale.id } as Sale,
//         productId: dto.productId,
//         description: dto.description,
//         qty: dto.qty,
//         unitPrice: dto.unitPrice,
//         lineTotal
//       });

//       await manager.save(item);

//       sale.totalAmount += lineTotal;
//       await manager.save(sale);

//       return item;
//     });
//   }

//   async remove(itemId: string) {
//     return this.dataSource.transaction(async manager => {
//       const item = await manager.findOne(SaleItem, {
//         where: { id: itemId },
//         relations: ['sale', 'sale.remito'],
//       });

//       if (!item) throw new NotFoundException('Ítem no encontrado');

//       this.assertEditable(item.sale);

//       item.sale.totalAmount -= Number(item.lineTotal);
//       await manager.save(item.sale);

//       await manager.remove(item);

//       return { success: true };
//     });
//   }
// }

//refactor
@Injectable()
export class SaleItemService {
  constructor(private readonly salesService: SalesService) {}

  create(saleId: string, dto: CreateSaleItemDto) {
    return this.salesService.addItem(saleId, dto);
  }

  remove(itemId: string) {
    return this.salesService.removeItem(itemId);
  }
}
