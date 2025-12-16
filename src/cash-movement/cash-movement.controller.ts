import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { CashMovementsService } from './cash-movement.service';

@ApiTags('Cash Movements')
@Controller('cash-movements')
export class CashMovementsController {
  constructor(private readonly movementsService: CashMovementsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar movimientos de caja', description: 'Permite filtrar movimientos por caja, rango de fechas y tipo (IN/OUT).' })
  @ApiQuery({ name: 'cashRegisterId', required: false, description: 'ID de la caja' })
  @ApiQuery({ name: 'from', required: false, description: 'Fecha inicial (YYYY-MM-DD)' })
  @ApiQuery({ name: 'to', required: false, description: 'Fecha final (YYYY-MM-DD)' })
  @ApiQuery({ name: 'type', required: false, enum: ['IN', 'OUT'], description: 'Tipo de movimiento' })
  @ApiResponse({ status: 200, description: 'Listado de movimientos filtrados.' })
  async list(
    @Query('cashRegisterId') cashRegisterId?: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('type') type?: 'IN' | 'OUT'
  ) {
    return this.movementsService.listMovements({ cashRegisterId, from, to, type });
  }
}
