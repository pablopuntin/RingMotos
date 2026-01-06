// import {
//   Controller,
//   Post,
//   Param,
//   Body,
// } from '@nestjs/common';
// import {
//   ApiTags,
//   ApiOperation,
//   ApiParam,
//   ApiResponse,
//   ApiBody,
// } from '@nestjs/swagger';
// import { PosSaleActionDto } from './dto/pos-sale-action.dto';
// import { Sale } from 'src/sale/entities/sale.entity';
// import { PosService } from './pos.service';

// @ApiTags('POS')
// @Controller('pos')
// export class PosController {
//   constructor(private readonly posService: PosService) {}

//   @Post('sales/:id/action')
//   @ApiOperation({
//     summary: 'Acción POS sobre una venta',
//     description: `
// Permite ejecutar acciones rápidas desde el POS sobre una venta confirmada.

// Acciones posibles:
// - **NO_PAYMENT**: confirma la venta sin pago
// - **PAY**: registra un pago total o parcial
//     `,
//   })
//   @ApiParam({
//     name: 'id',
//     description: 'ID de la venta',
//     example: 'c4055ee7-8007-4429-912d-9ec356baafd1',
//   })
//   @ApiBody({
//     type: PosSaleActionDto,
//     examples: {
//       noPayment: {
//         summary: 'Venta sin pago',
//         value: {
//           action: 'NO_PAYMENT',
//         },
//       },
//       partialPayment: {
//         summary: 'Pago parcial',
//         value: {
//           action: 'PAY',
//           amount: 1500,
//           paymentMethod: 'cash',
//           receivedBy: 'cf28836b-0066-4e08-bbeb-6e2cd337a345',
//         },
//       },
//     },
//   })
//   @ApiResponse({
//     status: 200,
//     description: 'Venta procesada correctamente',
//     type: Sale,
//   })
//   handleSaleAction(
//     @Param('id') id: string,
//     @Body() dto: PosSaleActionDto,
//   ) {
//     return this.posService.handleSaleAction(id, dto);
//   }
// }

//ref
import {
  Controller,
  Post,
  Param,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { PosSaleActionDto } from './dto/pos-sale-action.dto';
import { Sale } from 'src/sale/entities/sale.entity';
import { PosService } from './pos.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthSwagger } from 'src/auth/decorators/auth-swagger.decorator';

@ApiTags('POS')
@Controller('pos')
export class PosController {
  constructor(private readonly posService: PosService) {}

  @AuthSwagger()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('superadmin', 'admin')
  @Post('sales/:id/action')
  @ApiOperation({ 
    summary: 'Acción POS sobre una venta',
    description: `
Permite ejecutar acciones rápidas desde el POS sobre una venta confirmada.

Acciones posibles:
- **NO_PAYMENT**: confirma la venta sin pago
- **PAY**: registra un pago total o parcial

⚠️ El campo **receivedBy** se obtiene automáticamente del usuario autenticado (JWT)
    `,
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la venta',
    example: 'c4055ee7-8007-4429-912d-9ec356baafd1',
  })
  @ApiBody({
    type: PosSaleActionDto,
    examples: {
      noPayment: {
        summary: 'Venta sin pago',
        value: {
          action: 'NO_PAYMENT',
        },
      },
      partialPayment: {
        summary: 'Pago parcial',
        value: {
          action: 'PAY',
          amount: 1500,
          paymentMethod: 'cash',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Venta procesada correctamente',
    type: Sale,
  })
  handleSaleAction(
    @Param('id') id: string,
    @Body() dto: PosSaleActionDto,
    @Req() req: any,
  ) {
    return this.posService.handleSaleAction(
      id,
      dto,
      req.user,
    );
  }
}
