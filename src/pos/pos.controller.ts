import {
  Controller,
  Post,
  Param,
  Body,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiBody
} from '@nestjs/swagger';

import { PosService } from './pos.service';
import { PosSaleActionDto } from './dto/pos-sale-action.dto';
import { Sale } from 'src/sale/entities/sale.entity';

@ApiTags('POS')
@Controller('pos')
export class PosController {
  constructor(private readonly posService: PosService) {}

  @Post('sales/:id/action')
  @ApiOperation({ summary: 'Acción POS sobre una venta' })
  @ApiParam({ name: 'id', description: 'ID de la venta' })
  @ApiBody({ type: PosSaleActionDto })
  @ApiResponse({ status: 200, type: Sale })
  handleSaleAction(
    @Param('id') id: string,
    @Body() dto: PosSaleActionDto,
  ) {
    return this.posService.handleSaleAction(id, dto);
  }
}
