import { Controller, Post, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SaleItemService } from './sale-item.service';
import { CreateSaleItemDto } from './dto/create-sale-item.dto';

// @ApiTags('Sale Items')
// @Controller('sales')
// export class SaleItemController {
//   constructor(private readonly service: SaleItemService) {}

//   @Post(':saleId/items')
//   @ApiOperation({ summary: 'Agregar ítem a una venta' })
//   create(
//     @Param('saleId') saleId: string,
//     @Body() dto: CreateSaleItemDto,
//   ) {
//     return this.service.create(saleId, dto);
//   }

//   @Delete('items/:itemId')
//   @ApiOperation({ summary: 'Eliminar ítem de una venta' })
//   remove(@Param('itemId') itemId: string) {
//     return this.service.remove(itemId);
//   }
// }

//refactor
@ApiTags('Sale Items')
@Controller('sales')
export class SaleItemController {
  constructor(private readonly service: SaleItemService) {}

  @Post(':saleId/items')
  create(
    @Param('saleId') saleId: string,
    @Body() dto: CreateSaleItemDto,
  ) {
    return this.service.create(saleId, dto);
  }

  @Delete('items/:itemId')
  remove(@Param('itemId') itemId: string) {
    return this.service.remove(itemId);
  }
}
