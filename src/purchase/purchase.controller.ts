// purchases/purchases.controller.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PurchasesService } from './purchase.service';

@Controller('purchases')
export class PurchasesController {
  constructor(private readonly service: PurchasesService) {}

  @Post()
  create(@Body() dto: any) { return this.service.create(dto); }

  @Post(':id/confirm')
  confirm(@Param('id') id: string) { return this.service.confirm(id); }

  @Get()
  list() { return this.service.list(); }
}
