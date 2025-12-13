import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentAllocationService } from './payment-allocation.service';
import { CreatePaymentAllocationDto } from './dto/create-payment-allocation.dto';
import { UpdatePaymentAllocationDto } from './dto/update-payment-allocation.dto';

@Controller('payment-allocation')
export class PaymentAllocationController {
  constructor(private readonly paymentAllocationService: PaymentAllocationService) {}

  @Post()
  create(@Body() createPaymentAllocationDto: CreatePaymentAllocationDto) {
    return this.paymentAllocationService.create(createPaymentAllocationDto);
  }

  @Get()
  findAll() {
    return this.paymentAllocationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentAllocationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentAllocationDto: UpdatePaymentAllocationDto) {
    return this.paymentAllocationService.update(+id, updatePaymentAllocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentAllocationService.remove(+id);
  }
}
