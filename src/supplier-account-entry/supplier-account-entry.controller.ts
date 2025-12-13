import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SupplierAccountEntryService } from './supplier-account-entry.service';
import { CreateSupplierAccountEntryDto } from './dto/create-supplier-account-entry.dto';
import { UpdateSupplierAccountEntryDto } from './dto/update-supplier-account-entry.dto';

@Controller('supplier-account-entry')
export class SupplierAccountEntryController {
  constructor(private readonly supplierAccountEntryService: SupplierAccountEntryService) {}

  @Post()
  create(@Body() createSupplierAccountEntryDto: CreateSupplierAccountEntryDto) {
    return this.supplierAccountEntryService.create(createSupplierAccountEntryDto);
  }

  @Get()
  findAll() {
    return this.supplierAccountEntryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supplierAccountEntryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSupplierAccountEntryDto: UpdateSupplierAccountEntryDto) {
    return this.supplierAccountEntryService.update(+id, updateSupplierAccountEntryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supplierAccountEntryService.remove(+id);
  }
}
