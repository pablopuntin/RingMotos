import {
  Controller,
  Post,
  Patch,
  Get,
  Param,
  Body,
  Delete
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SalesService } from './sale.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { AddSaleItemDto } from './dto/create-items.dto';
import { RemitosService } from 'src/remito/remito.service';
import { CreateSaleItemDto } from 'src/sale-item/dto/create-sale-item.dto';

// @ApiTags('Sales')
// @Controller('sales')
// export class SalesController {
//   constructor(private readonly salesService: SalesService,
//     private readonly remitosService: RemitosService,
//   ) {}

//   @Post()
//   @ApiOperation({ summary: 'Crear venta (DRAFT)' })
//   create(@Body() dto: CreateSaleDto) {
//     return this.salesService.create(dto);
//   }

//   @Post(':id/items')
//   @ApiOperation({ summary: 'Agregar ítems a la venta' })
//   addItem(
//     @Param('id') id: string,
//     @Body() dto: AddSaleItemDto,
//   ) {
//     return this.salesService.addItem(id, dto);
//   }

//   @Patch(':id/confirm')
//   @ApiOperation({ summary: 'Confirmar venta' })
//   confirm(@Param('id') id: string) {
//     return this.salesService.confirm(id);
//   }

//   @Patch(':id/cancel')
//   @ApiOperation({ summary: 'Cancelar venta / base para nota de crédito' })
//   cancel(@Param('id') id: string) {
//     return this.salesService.cancel(id);
//   }

//   @Get()
//   @ApiOperation({ summary: 'Listar ventas' })
//   findAll() {
//     return this.salesService.findAll();
//   }

//   @Get(':id')
//   @ApiOperation({ summary: 'Detalle de venta' })
//   findOne(@Param('id') id: string) {
//     return this.salesService.findOne(id);
//   }
// }

//refactor
@ApiTags('Sales')
@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  create(@Body() dto: CreateSaleDto) {
    return this.salesService.create(dto);
  }

  @Post(':id/items')
  addItem(
    @Param('id') id: string,
    @Body() dto: AddSaleItemDto,
  ) {
    return this.salesService.addItem(id, dto);
  }

  @Delete('items/:itemId')
  removeItem(@Param('itemId') itemId: string) {
    return this.salesService.removeItem(itemId);
  }

  @Patch(':id/confirm')
  confirm(@Param('id') id: string) {
    return this.salesService.confirm(id);
  }

  @Get()
  findAll() {
    return this.salesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salesService.findOne(id);
  }
}

