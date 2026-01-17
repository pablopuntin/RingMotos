import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { PurchaseItemService } from './purchase-item.service';

@Controller('purchase-items')
export class PurchaseItemController {
  constructor(private readonly purchaseItemService: PurchaseItemService) {}

  @Post()
  create(@Body() dto: { description: string; qty: number; unitCost: number; productId?: string }) {
    return this.purchaseItemService.create(dto);
  }

  @Get()
  findAll() {
    return this.purchaseItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchaseItemService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purchaseItemService.remove(id);
  }
}
