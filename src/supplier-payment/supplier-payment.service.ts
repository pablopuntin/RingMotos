import { Injectable } from '@nestjs/common';
import { CreateSupplierPaymentDto } from './dto/create-supplier-payment.dto';
import { UpdateSupplierPaymentDto } from './dto/update-supplier-payment.dto';

@Injectable()
export class SupplierPaymentService {
  create(createSupplierPaymentDto: CreateSupplierPaymentDto) {
    return 'This action adds a new supplierPayment';
  }

  findAll() {
    return `This action returns all supplierPayment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} supplierPayment`;
  }

  update(id: number, updateSupplierPaymentDto: UpdateSupplierPaymentDto) {
    return `This action updates a #${id} supplierPayment`;
  }

  remove(id: number) {
    return `This action removes a #${id} supplierPayment`;
  }
}
