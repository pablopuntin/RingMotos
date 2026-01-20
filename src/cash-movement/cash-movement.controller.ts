import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { CashMovementsService } from './cash-movement.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';

@ApiTags('Cash Movements')
@Controller('cash-movements')
export class CashMovementsController {
  constructor(private readonly movementsService: CashMovementsService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('superadmin')
  @Get()
  @ApiOperation({
    summary: 'Listar movimientos de caja',
    description: `
      Devuelve los movimientos de caja registrados.
      Se pueden aplicar filtros opcionales:
      - **cashRegisterId**: ID de la caja asociada.
      - **from/to**: rango de fechas (formato YYYY-MM-DD).
      - **type**: tipo de movimiento (IN = ingreso, OUT = egreso).
      Si no se especifica rango de fechas, se listan los movimientos del día actual.
    `,
  })
  @ApiQuery({
    name: 'cashRegisterId',
    required: false,
    description: 'Identificador único de la caja',
    example: 'uuid-caja',
  })
  @ApiQuery({
    name: 'from',
    required: false,
    description: 'Fecha inicial del rango (YYYY-MM-DD)',
    example: '2025-12-01',
  })
  @ApiQuery({
    name: 'to',
    required: false,
    description: 'Fecha final del rango (YYYY-MM-DD)',
    example: '2025-12-31',
  })
  @ApiQuery({
    name: 'type',
    required: false,
    enum: ['IN', 'OUT'],
    description: 'Tipo de movimiento: IN (ingreso) o OUT (egreso)',
    example: 'IN',
  })
  @ApiResponse({
    status: 200,
    description: 'Listado de movimientos filtrados.',
    type: Object, // aquí podrías poner un DTO de respuesta si lo defines
  })
  async list(
    @Query('cashRegisterId') cashRegisterId?: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('type') type?: 'IN' | 'OUT',
  ) {
    return this.movementsService.listMovements({ cashRegisterId, from, to, type });
  }
}
