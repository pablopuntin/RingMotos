import { Controller, Post, Delete, Param, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { SaleItemService } from './sale-item.service';
import { CreateSaleItemDto } from './dto/create-sale-item.dto';
import { SaleItem } from './entities/sale-item.entity';

@ApiTags('Sale Items')
@Controller('sales')
export class SaleItemController {
  constructor(private readonly service: SaleItemService) {}

  @Post(':saleId/items')
  @ApiOperation({
    summary: 'Agregar ítem a una venta (alias NO USAR)',
    description:
      'Este endpoint es equivalente a POST /sales/{id}/items. Se recomienda usar el de Sales.',
  })
  @ApiParam({ name: 'saleId', description: 'ID de la venta' })
  @ApiBody({ type: CreateSaleItemDto })
  @ApiResponse({ status: 201, type: SaleItem })
  create(
    @Param('saleId') saleId: string,
    @Body() dto: CreateSaleItemDto,
  ) {
    return this.service.create(saleId, dto);
  }

  @Delete('items/:itemId')
  @ApiOperation({
    summary: 'Eliminar ítem de una venta (alias)',
    description:
      'Este endpoint es equivalente a DELETE /sales/items/{itemId}.',
  })
  @ApiParam({ name: 'itemId', description: 'ID del ítem' })
  @ApiResponse({
    status: 200,
    schema: { example: { success: true } },
  })
  remove(@Param('itemId') itemId: string) {
    return this.service.remove(itemId);
  }
}
