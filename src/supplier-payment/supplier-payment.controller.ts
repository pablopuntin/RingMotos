// supplier-payments/supplier-payments.controller.ts
import { Controller, Post, Body, Param } from '@nestjs/common';
import { SupplierPaymentsService } from './supplier-payment.service';

@Controller('supplier-payments')
export class SupplierPaymentsController {
  constructor(private readonly service: SupplierPaymentsService) {}

  @Post()
  create(@Body() dto: any) { return this.service.create(dto); }

  @Post(':id/reverse')
  reverse(@Param('id') id: string) { return this.service.reverse(id); }
}
