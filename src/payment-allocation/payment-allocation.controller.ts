import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaymentAllocationService } from './payment-allocation.service';

@ApiTags('Payment Allocations')
@Controller('payments')
export class PaymentAllocationController {
  constructor(
    private readonly service: PaymentAllocationService,
  ) {}

  @Get(':paymentId/allocations')
  getByPayment(@Param('paymentId') paymentId: string) {
    return this.service.findByPayment(paymentId);
  }
}
