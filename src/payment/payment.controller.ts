// import { Controller, Post, Body } from '@nestjs/common';
// import {
//   ApiTags,
//   ApiOperation,
//   ApiResponse,
//   ApiBody,
// } from '@nestjs/swagger';
// import { PaymentService } from './payment.service';
// import { CreatePaymentDto } from './dto/create-payment.dto';
// import { Payment } from './entities/payment.entity';
// import { CreateDirectPaymentDto } from './dto/create-direct-payment.dto';

// @ApiTags('Payments')
// @Controller('payments')
// export class PaymentController {
//   constructor(private readonly service: PaymentService) {}

//   @Post()
//   @ApiOperation({
//     summary: 'Registrar pago de cliente',
//     description: `
//       Registra un pago recibido de un cliente.
//       El pago se asigna a una o varias ventas, actualiza la caja y la cuenta corriente.
//       - amount: monto total del pago (positivo).
//       - paymentMethod: método de pago (ej. CASH, CARD).
//       - receivedBy: usuario que recibe el pago.
//       - allocations: lista de ventas a las que se aplica el pago.
//     `,
//   })
//   @ApiBody({
//     type: CreatePaymentDto,
//     description: 'Datos necesarios para registrar el pago',
//     examples: {
//       ejemplo1: {
//         summary: 'Pago completo de una venta',
//         value: {
//           amount: 1500,
//           paymentMethod: 'CASH',
//           receivedBy: 'usuario-uuid',
//           allocations: [
//             { saleId: 'venta-uuid-123', amount: 1500 },
//           ]
//         }
//       },
//       ejemplo2: {
//         summary: 'Pago parcial de varias ventas',
//         value: {
//           amount: 2000,
//           paymentMethod: 'CARD',
//           receivedBy: 'usuario-uuid',
//           allocations: [
//             { saleId: 'venta-uuid-123', amount: 1200 },
//             { saleId: 'venta-uuid-456', amount: 800 },
//           ]
//         }
//       }
//     }
//   })
//   @ApiResponse({
//     status: 201,
//     description: 'Pago registrado correctamente',
//     type: Payment,
//   })
//   @ApiResponse({
//     status: 400,
//     description: 'Datos inválidos (ej. monto <= 0, caja cerrada)',
//   })
//   @ApiResponse({
//     status: 404,
//     description: 'Venta no encontrada',
//   })
//   @ApiResponse({
//     status: 409,
//     description: 'Conflicto: monto supera saldo pendiente o venta cancelada',
//   })
//   create(@Body() dto: CreatePaymentDto) {
//     return this.service.create(dto);
//   }


// @Post('direct')
// @ApiOperation({
//   summary: 'Pago directo a cuenta corriente',
//   description: `
// Registra un pago directo del cliente sin imputarlo a ventas.
// - Impacta en caja
// - Impacta en cuenta corriente
// - No modifica ventas ni allocations
// `,
// })
// @ApiBody({
//   type: CreateDirectPaymentDto,
//   examples: {
//     ejemplo: {
//       summary: 'Pago directo',
//       value: {
//         clientId: 'ad8b0be7-4ba9-4746-8b27-de4d4f44f3f4',
//         amount: 500,
//         paymentMethod: 'CASH',
//         receivedBy: 'cf28836b-0066-4e08-bbeb-6e2cd337a345',
//         description: 'Entrega a cuenta',
//       },
//     },
//   },
// })
// @ApiResponse({
//   status: 201,
//   description: 'Pago directo registrado correctamente',
// })
// @ApiResponse({
//   status: 400,
//   description: 'Datos inválidos',
// })
// @ApiResponse({
//   status: 404,
//   description: 'Cliente no encontrado',
// })
// createDirect(@Body() dto: CreateDirectPaymentDto) {
//   return this.service.createDirectPayment(dto);
// }

// }

//ref
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Payment } from './entities/payment.entity';
import { CreateDirectPaymentDto } from './dto/create-direct-payment.dto';


@ApiTags('Payments')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('superadmin', 'admin')
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
      - receivedBy: usuario que recibe el pago (tomado del token).
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
          allocations: [
            { saleId: 'venta-uuid-123', amount: 1500 },
          ],
        },
      },
      ejemplo2: {
        summary: 'Pago parcial de varias ventas',
        value: {
          amount: 2000,
          paymentMethod: 'CARD',
          allocations: [
            { saleId: 'venta-uuid-123', amount: 1200 },
            { saleId: 'venta-uuid-456', amount: 800 },
          ],
        },
      },
    },
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
  create(@Body() dto: CreatePaymentDto, @Req() req: any) {
    const userId = req.user.id; // extraemos del token

    // Construimos el DTO completo para el servicio
    const dtoWithUserId = {
      ...dto,
      receivedBy: userId,
    };

    return this.service.create(dtoWithUserId, userId);
  }

  @Post('direct')
  @ApiOperation({
    summary: 'Pago directo a cuenta corriente',
    description: `
      Registra un pago directo del cliente sin imputarlo a ventas.
      - Impacta en caja
      - Impacta en cuenta corriente
      - No modifica ventas ni allocations
    `,
  })
  @ApiBody({
    type: CreateDirectPaymentDto,
    examples: {
      ejemplo: {
        summary: 'Pago directo',
        value: {
          clientId: 'ad8b0be7-4ba9-4746-8b27-de4d4f44f3f4',
          amount: 500,
          paymentMethod: 'CASH',
          description: 'Entrega a cuenta',
        }
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'Pago directo registrado correctamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
  })
  @ApiResponse({
    status: 404,
    description: 'Cliente no encontrado',
  })
  createDirect(@Body() dto: CreateDirectPaymentDto, @Req() req: any) {
  const userId = req.user.id;

  const dtoWithUserId = {
    ...dto,
    receivedBy: userId,
  };

  return this.service.createDirectPayment(dtoWithUserId, userId);
}

}
