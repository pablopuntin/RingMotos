import {
  Controller,
  Post,
  Patch,
  Get,
  Param,
  Body,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { SalesService } from './sale.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { AddSaleItemDto } from './dto/create-items.dto';
import { Sale } from './entities/sale.entity';
import { SaleItem } from 'src/sale-item/entities/sale-item.entity';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

// @ApiTags('Sales')
// @Controller('sales')
// export class SalesController {
//   constructor(private readonly salesService: SalesService) {}

//   @UseGuards(AuthGuard('jwt'), RolesGuard)
//   @Post()
//   @Roles('superadmin', 'admin')
//   @ApiOperation({ summary: 'Crear venta (DRAFT)' })
//   //@ApiBody({ type: CreateSaleDto })
//   //@ApiResponse({ status: 201, type: Sale })
//   create(
//   @Body() dto: CreateSaleDto,
//   @Req() req
// ) {
//   return this.salesService.create(dto, req.user.userId);
// }

//   @Post(':id/items')
//   @ApiOperation({ summary: 'Agregar ítem a una venta' })
//   @ApiParam({ name: 'id', description: 'ID de la venta' })
//   @ApiBody({ type: AddSaleItemDto })
//   @ApiResponse({ status: 201, type: SaleItem })
//   addItem(@Param('id') id: string, @Body() dto: AddSaleItemDto) {
//     return this.salesService.addItem(id, dto);
//   }

//   @Delete('items/:itemId')
//   @ApiOperation({ summary: 'Eliminar ítem de una venta' })
//   @ApiParam({ name: 'itemId', description: 'ID del ítem' })
//   @ApiResponse({ status: 200 })
//   removeItem(@Param('itemId') itemId: string) {
//     return this.salesService.removeItem(itemId);
//   }

//   @Patch(':id/confirm')
//   @ApiOperation({ summary: 'Confirmar venta (sin registrar pago)' })
//   @ApiParam({ name: 'id', description: 'ID de la venta' })
//   @ApiResponse({ status: 200, type: Sale })
//   confirm(@Param('id') id: string) {
//     return this.salesService.confirm(id);
//   }

//   @Get()
//   @ApiOperation({ summary: 'Listado de ventas' })
//   @ApiResponse({ status: 200, type: [Sale] })
//   findAll() {
//     return this.salesService.findAll();
//   }

//   @Get(':id')
//   @ApiOperation({ summary: 'Detalle de venta' })
//   @ApiParam({ name: 'id', description: 'ID de la venta' })
//   @ApiResponse({ status: 200, type: Sale })
//   findOne(@Param('id') id: string) {
//     return this.salesService.findOne(id);
//   }
// }


@ApiTags('Sales')
@ApiBearerAuth()
@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('superadmin', 'admin')
  @ApiOperation({ summary: 'Crear venta (DRAFT)' })
  create(
    @Body() dto: CreateSaleDto,
    @Req() req: any,
  ) {
    return this.salesService.create(dto, req.user.userId);
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
  removeItem(@Param('itemId') itemId: string) {
    return this.salesService.removeItem(itemId);
  }

  @Patch(':id/confirm')
  @ApiOperation({ summary: 'Confirmar venta (sin registrar pago)' })
  @ApiParam({ name: 'id', description: 'ID de la venta' })
  confirm(@Param('id') id: string) {
    return this.salesService.confirm(id);
  }

  @Get()
  @ApiOperation({ summary: 'Listado de ventas' })
  findAll() {
    return this.salesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detalle de venta' })
  @ApiParam({ name: 'id', description: 'ID de la venta' })
  findOne(@Param('id') id: string) {
    return this.salesService.findOne(id);
  }
}
