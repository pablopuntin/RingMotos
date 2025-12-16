import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@ApiTags('Payments')
@Controller('payments')
export class PaymentController {
  constructor(private readonly service: PaymentService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar pago de cliente' })
  create(@Body() dto: CreatePaymentDto) {
    return this.service.create(dto);
  }
}
