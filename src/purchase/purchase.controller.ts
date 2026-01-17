import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody
} from '@nestjs/swagger';
import { PurchasesService } from './purchase.service';
import { Purchase } from './entities/purchase.entity';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { AuthSwagger } from 'src/auth/decorators/auth-swagger.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PurchaseStatus } from './entities/purchase.entity';



@ApiTags('Purchases')
@ApiBearerAuth()
@AuthSwagger()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('superadmin')
@Controller('purchases')
export class PurchasesController {
  constructor(private readonly purchaseService: PurchasesService) {}

  /* =========================
     Crear compra (DRAFT)
  ========================== */

  @Post()
  @ApiOperation({
    summary: 'Crear compra (DRAFT)',
    description:
      'Crea una compra en estado DRAFT. No impacta deuda ni contabilidad.',
  })
  @ApiResponse({
    status: 201,
    description: 'Compra creada',
    type: Purchase,
  })
  create(@Body() dto: CreatePurchaseDto) {
    return this.purchaseService.create(dto);
  }

  /* =========================
     Confirmar compra
  ========================== */

  @Post(':id/confirm')
  @ApiOperation({
    summary: 'Confirmar compra',
    description:
      'Confirma una compra DRAFT. Impacta la deuda del proveedor y genera movimiento contable.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la compra',
  })
  @ApiResponse({
    status: 200,
    description: 'Compra confirmada',
    type: Purchase,
  })
  confirm(@Param('id') id: string) {
    return this.purchaseService.confirm(id);
  }

  /* =========================
     Listar compras
  ========================== */

  @Get()
  @ApiOperation({
    summary: 'Listar compras',
    description:
      'Lista compras con proveedor e ítems. Soporta filtros opcionales.',
  })
  @ApiQuery({
    name: 'supplierId',
    required: false,
    description: 'Filtrar por proveedor',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'Filtrar por estado (DRAFT / CONFIRMED)',
  })
  @ApiResponse({
    status: 200,
    description: 'Listado de compras',
    type: [Purchase],
  })
 list(
  @Query('supplierId') supplierId?: string,
  @Query('status') status?: PurchaseStatus,
) {
  return this.purchaseService.list({ supplierId, status });
}

@Post(':id/confirm-and-pay')
@ApiOperation({
  summary: 'Confirmar compra y pagar (POS de compras)',
  description:
    'Confirma una compra DRAFT y permite pagar total o parcialmente en el mismo acto.',
})
@ApiParam({
  name: 'id',
  description: 'ID de la compra en estado DRAFT',
})
@ApiBody({
  description: 'Monto que se entrega al proveedor al momento de confirmar',
  required: false,
  schema: {
    type: 'object',
    properties: {
      entrega: {
        type: 'number',
        example: 100000,
        description:
          'Monto que se paga en el momento. Puede ser 0, parcial o total.',
      },
    },
  },
})
@ApiResponse({
  status: 200,
  description: 'Compra confirmada y (opcionalmente) pagada',
})
async confirmAndPay(
  @Param('id') id: string,
  @Body() body?: { entrega?: number },
) {
  return this.purchaseService.confirmAndPay(id, body?.entrega ?? 0);
}


}
