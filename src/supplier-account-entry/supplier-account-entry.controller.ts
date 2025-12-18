// supplier-account-entries/supplier-account-entries.controller.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SupplierAccountEntriesService } from './supplier-account-entry.service';

@Controller('supplier-account-entries')
export class SupplierAccountEntriesController {
  constructor(private readonly service: SupplierAccountEntriesService) {}

  @Get('supplier/:supplierId')
  listBySupplier(@Param('supplierId') supplierId: string) {
    return this.service.listBySupplier(supplierId);
  }

  @Post('adjustment')
  createAdjustment(@Body() dto: { supplierId: string; amount: number; description?: string }) {
    return this.service.createAdjustment(dto.supplierId, dto.amount, dto.description);
  }
}
