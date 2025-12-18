import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { PurchasesService } from './purchase.service';
import { Purchase } from './entities/purchase.entity';

@ApiTags('Purchases')
@Controller('purchases')
export class PurchasesController {
  constructor(private readonly service: PurchasesService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear una nueva compra',
    description: 'Genera una compra en estado DRAFT asociada a un proveedor y con sus ítems. Calcula el total y guarda la compra.'
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        supplierId: { type: 'string', description: 'ID del proveedor' },
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              description: { type: 'string' },
              qty: { type: 'number' },
              unitCost: { type: 'number' },
              productId: { type: 'string', nullable: true }
            }
          }
        }
      }
    }
  })
  @ApiResponse({ status: 201, description: 'Compra creada exitosamente', type: Purchase })
  create(@Body() dto: any) {
    return this.service.create(dto);
  }

  @Post(':id/confirm')
  @ApiOperation({
    summary: 'Confirmar una compra',
    description: 'Cambia el estado de una compra de DRAFT a CONFIRMED, actualiza la deuda del proveedor y genera un asiento en cuenta corriente.'
  })
  @ApiParam({ name: 'id', type: 'string', description: 'ID de la compra a confirmar' })
  @ApiResponse({ status: 200, description: 'Compra confirmada exitosamente', type: Purchase })
  @ApiResponse({ status: 404, description: 'Compra no encontrada' })
  @ApiResponse({ status: 400, description: 'Solo se pueden confirmar compras en estado DRAFT' })
  confirm(@Param('id') id: string) {
    return this.service.confirm(id);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar compras',
    description: 'Devuelve todas las compras, con sus ítems y proveedor. Se pueden filtrar por proveedor y estado.'
  })
  @ApiResponse({ status: 200, description: 'Listado de compras', type: [Purchase] })
  list() {
    return this.service.list();
  }
}
