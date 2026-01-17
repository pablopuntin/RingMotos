// import { Injectable } from '@nestjs/common';
// import { CreatePurchaseItemDto } from './dto/create-purchase-item.dto';
// import { UpdatePurchaseItemDto } from './dto/update-purchase-item.dto';

// @Injectable()
// export class PurchaseItemService {
//   create(createPurchaseItemDto: CreatePurchaseItemDto) {
//     return 'This action adds a new purchaseItem';
//   }

//   findAll() {
//     return `This action returns all purchaseItem`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} purchaseItem`;
//   }

//   update(id: number, updatePurchaseItemDto: UpdatePurchaseItemDto) {
//     return `This action updates a #${id} purchaseItem`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} purchaseItem`;
//   }
// }


//ref
 import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseItem } from './entities/purchase-item.entity';

@Injectable()
export class PurchaseItemService {
  constructor(
    @InjectRepository(PurchaseItem)
    private readonly itemRepo: Repository<PurchaseItem>,
  ) {}

  // (Opcional) si querés seguir creando ítems sueltos
  async create(dto: { description: string; qty: number; unitCost: number; productId?: string }) {
    const lineTotal = Number(dto.qty) * Number(dto.unitCost);

    const item = this.itemRepo.create({
      description: dto.description,
      qty: dto.qty.toString(),
      unitCost: dto.unitCost.toString(),
      lineTotal: lineTotal.toString(),
      productId: dto.productId,
    });

    return this.itemRepo.save(item);
  }

  async findAll(): Promise<PurchaseItem[]> {
    return this.itemRepo.find();
  }

  async findOne(id: string): Promise<PurchaseItem> {
    const item = await this.itemRepo.findOneBy({ id });

    if (!item) {
      throw new NotFoundException('Item de compra no encontrado');
    }

    return item;
  }

  async remove(id: string): Promise<void> {
    const item = await this.findOne(id);
    await this.itemRepo.remove(item);
  }
}
