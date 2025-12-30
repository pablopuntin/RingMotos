// import { Controller, Post, Body } from '@nestjs/common';
// import { ApiTags, ApiOperation } from '@nestjs/swagger';
// import { PaymentService } from './payment.service';
// import { CreatePaymentDto } from './dto/create-payment.dto';

// @ApiTags('Payments')
// @Controller('payments')
// export class PaymentController {
//   constructor(private readonly service: PaymentService) {}

//   @Post()
//   @ApiOperation({ summary: 'Registrar pago de cliente' })
//   create(@Body() dto: CreatePaymentDto) {
//     return this.service.create(dto);
//   }
// }

//ref
import { Controller, Post, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Payment } from './entities/payment.entity';

@ApiTags('Payments')
@Controller('payments')
export class PaymentController {
  constructor(private readonly service: PaymentService) {}

  @Post()
  @ApiOperation({
    summary: 'Registrar pago de cliente',
    description: `
      Registra un pago recibido de un cliente.
      El pago se asigna a una o varias ventas, actualiza la caja y la cuenta corriente.
      - amount: monto total del pago (positivo).
      - paymentMethod: método de pago (ej. CASH, CARD).
      - receivedBy: usuario que recibe el pago.
      - allocations: lista de ventas a las que se aplica el pago.
    `,
  })
  @ApiBody({
    type: CreatePaymentDto,
    description: 'Datos necesarios para registrar el pago',
    examples: {
      ejemplo1: {
        summary: 'Pago completo de una venta',
        value: {
          amount: 1500,
          paymentMethod: 'CASH',
          receivedBy: 'usuario-uuid',
          allocations: [
            { saleId: 'venta-uuid-123', amount: 1500 },
          ]
        }
      },
      ejemplo2: {
        summary: 'Pago parcial de varias ventas',
        value: {
          amount: 2000,
          paymentMethod: 'CARD',
          receivedBy: 'usuario-uuid',
          allocations: [
            { saleId: 'venta-uuid-123', amount: 1200 },
            { saleId: 'venta-uuid-456', amount: 800 },
          ]
        }
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'Pago registrado correctamente',
    type: Payment,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos (ej. monto <= 0, caja cerrada)',
  })
  @ApiResponse({
    status: 404,
    description: 'Venta no encontrada',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflicto: monto supera saldo pendiente o venta cancelada',
  })
  create(@Body() dto: CreatePaymentDto) {
    return this.service.create(dto);
  }
}
