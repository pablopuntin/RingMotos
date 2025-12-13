import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SupplierPaymentService } from './supplier-payment.service';
import { CreateSupplierPaymentDto } from './dto/create-supplier-payment.dto';
import { UpdateSupplierPaymentDto } from './dto/update-supplier-payment.dto';

@Controller('supplier-payment')
export class SupplierPaymentController {
  constructor(private readonly supplierPaymentService: SupplierPaymentService) {}

  @Post()
  create(@Body() createSupplierPaymentDto: CreateSupplierPaymentDto) {
    return this.supplierPaymentService.create(createSupplierPaymentDto);
  }

  @Get()
  findAll() {
    return this.supplierPaymentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supplierPaymentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSupplierPaymentDto: UpdateSupplierPaymentDto) {
    return this.supplierPaymentService.update(+id, updateSupplierPaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supplierPaymentService.remove(+id);
  }
}
