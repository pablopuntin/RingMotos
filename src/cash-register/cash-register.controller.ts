import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CashRegistersService } from './cash-register.service';
import { OpenCashRegisterDto } from './dto/open-cash-register.dto';
import { CloseCashRegisterDto } from './dto/close-cash-register.dto';

@ApiTags('Cash Registers')
@Controller('cash-registers')
export class CashRegistersController {
  constructor(private readonly cashService: CashRegistersService) {}

  @Post('open')
  @ApiOperation({ summary: 'Abrir una caja', description: 'Permite abrir una caja con un monto inicial y usuario responsable.' })
  @ApiResponse({ status: 201, description: 'Caja abierta correctamente.' })
  async open(@Body() dto: OpenCashRegisterDto) {
    return this.cashService.openCashRegister(dto);
  }

  @Post(':id/close')
  @ApiOperation({ summary: 'Cerrar una caja', description: 'Cierra la caja calculando el monto final en base a movimientos registrados.' })
  @ApiParam({ name: 'id', description: 'ID de la caja a cerrar' })
  @ApiResponse({ status: 200, description: 'Caja cerrada correctamente.' })
  async close(@Param('id') id: string, @Body() dto: CloseCashRegisterDto) {
    return this.cashService.closeCashRegister(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener detalle de caja', description: 'Devuelve información de una caja específica.' })
  @ApiParam({ name: 'id', description: 'ID de la caja' })
  @ApiResponse({ status: 200, description: 'Detalle de la caja.' })
  async getById(@Param('id') id: string) {
    return this.cashService.getCashRegister(id);
  }

  @Get(':id/movements')
  @ApiOperation({ summary: 'Listar movimientos de caja', description: 'Devuelve todos los movimientos (entradas/salidas) asociados a una caja.' })
  @ApiParam({ name: 'id', description: 'ID de la caja' })
  @ApiResponse({ status: 200, description: 'Listado de movimientos.' })
  async getMovements(@Param('id') id: string) {
    return this.cashService.getMovements(id);
  }
}
