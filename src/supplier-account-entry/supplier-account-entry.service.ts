import { Injectable } from '@nestjs/common';
import { CreateSupplierAccountEntryDto } from './dto/create-supplier-account-entry.dto';
import { UpdateSupplierAccountEntryDto } from './dto/update-supplier-account-entry.dto';

@Injectable()
export class SupplierAccountEntryService {
  create(createSupplierAccountEntryDto: CreateSupplierAccountEntryDto) {
    return 'This action adds a new supplierAccountEntry';
  }

  findAll() {
    return `This action returns all supplierAccountEntry`;
  }

  findOne(id: number) {
    return `This action returns a #${id} supplierAccountEntry`;
  }

  update(id: number, updateSupplierAccountEntryDto: UpdateSupplierAccountEntryDto) {
    return `This action updates a #${id} supplierAccountEntry`;
  }

  remove(id: number) {
    return `This action removes a #${id} supplierAccountEntry`;
  }
}
