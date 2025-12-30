import {
  Controller,
  Post,
  Patch,
  Get,
  Param,
  Body,
  Delete
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse
} from '@nestjs/swagger';
import { SalesService } from './sale.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { AddSaleItemDto } from './dto/create-items.dto';
import { Sale } from './entities/sale.entity';
import { SaleItem } from 'src/sale-item/entities/sale-item.entity';

@ApiTags('Sales')
@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear venta (DRAFT)' })
  @ApiBody({ type: CreateSaleDto })
  @ApiResponse({ status: 201, type: Sale })
  create(@Body() dto: CreateSaleDto) {
    return this.salesService.create(dto);
  }

  @Post(':id/items')
  @ApiOperation({ summary: 'Agregar ítem a una venta' })
  @ApiParam({ name: 'id', description: 'ID de la venta' })
  @ApiBody({ type: AddSaleItemDto })
  @ApiResponse({ status: 201, type: SaleItem })
  addItem(
    @Param('id') id: string,
    @Body() dto: AddSaleItemDto,
  ) {
    return this.salesService.addItem(id, dto);
  }

  @Delete('items/:itemId')
  @ApiOperation({ summary: 'Eliminar ítem de una venta' })
  @ApiParam({ name: 'itemId', description: 'ID del ítem' })
  @ApiResponse({
    status: 200,
    schema: { example: { success: true } },
  })
  removeItem(@Param('itemId') itemId: string) {
    return this.salesService.removeItem(itemId);
  }

  @Patch(':id/confirm')
  @ApiOperation({ summary: 'Confirmar venta (sin registrar pago)' })
  @ApiParam({ name: 'id', description: 'ID de la venta' })
  @ApiResponse({ status: 200, type: Sale })
  confirm(@Param('id') id: string) {
    return this.salesService.confirm(id);
  }

  @Get()
 @ApiOperation({ summary: 'Detalle de venta con ítems y pagos' })
  @ApiResponse({ status: 200, type: [Sale] })
  findAll() {
    return this.salesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detalle de venta' })
  @ApiParam({ name: 'id', description: 'ID de la venta' })
  @ApiResponse({ status: 200, type: Sale })
  findOne(@Param('id') id: string) {
    return this.salesService.findOne(id);
  }
}
