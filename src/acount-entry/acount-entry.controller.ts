// import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
// import { ApiTags, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
// import { AccountEntryService } from './acount-entry.service';
// import { CreateAccountEntryDto } from './dto/create-acount-entry.dto';
// import { AccountEntry } from './entities/acount-entry.entity';

// @ApiTags('Account Entries')
// @Controller('account-entries')
// export class AccountEntryController {
//   constructor(private readonly service: AccountEntryService) {}

//   @Post()
//   @ApiOperation({ summary: 'Crear movimiento de cuenta corriente' })
//   create(@Body() dto: CreateAccountEntryDto) {
//     return this.service.create(dto);
//   }

//   @Get('client/:clientId')
//   @ApiOperation({ summary: 'Cuenta corriente del cliente' })
//   findByClient(@Param('clientId') clientId: string) {
//     return this.service.findByClient(clientId);
//   }

  
//    @Get('history/:clientId')
//   @ApiOperation({ summary: 'Historial de movimientos de cuenta corriente de un cliente' })
//   @ApiParam({ name: 'clientId', description: 'ID del cliente', type: String })
//   @ApiQuery({ name: 'start', required: false, description: 'Fecha inicio (YYYY-MM-DD)' })
//   @ApiQuery({ name: 'end', required: false, description: 'Fecha fin (YYYY-MM-DD)' })
//   @ApiResponse({ status: 200, description: 'Lista de movimientos', type: [AccountEntry] })
//   async getHistory(
//     @Param('clientId') clientId: string,
//     @Query('start') start?: string,
//     @Query('end') end?: string,
//   ) {
//     // Si no se envían start y end, devuelve todo el historial
//     return this.service.getHistory(
//       clientId,
//       start ? new Date(start) : undefined,
//       end ? new Date(end) : undefined,
//     );
//   }

//   @Get('summary/:clientId')
//   @ApiOperation({ summary: 'Resumen mensual de compras, pagos y deuda de un cliente' })
//   @ApiParam({ name: 'clientId', description: 'ID del cliente', type: String })
//   @ApiQuery({ name: 'month', required: true, description: 'Mes (1-12)', type: Number })
//   @ApiQuery({ name: 'year', required: true, description: 'Año (YYYY)', type: Number })
//   @ApiResponse({
//     status: 200,
//     description: 'Resumen mensual con totales de compras, pagos, ajustes y saldo final',
//     schema: {
//       example: {
//         charges: 100,
//         payments: 80,
//         adjustments: 20,
//         lastBalance: 0,
//       },
//     },
//   })
//   async getMonthlySummary(
//     @Param('clientId') clientId: string,
//     @Query('month') month: number,
//     @Query('year') year: number,
//   ) {
//     return this.service.getMonthlySummary(clientId, month, year);
//   }

//   @Get('summary/:clientId')
// @ApiOperation({ summary: 'Resumen general de cuenta corriente de un cliente' })
// @ApiParam({ name: 'clientId', description: 'ID del cliente', type: String })
// @ApiQuery({ name: 'limit', required: false, description: 'Cantidad de movimientos recientes a mostrar', type: Number })
// @ApiResponse({
//   status: 200,
//   description: 'Resumen con saldo actual y últimos movimientos',
//   schema: {
//     example: {
//       clientId: 'uuid-cliente',
//       lastBalance: 2500.75,
//       recentMovements: [
//         {
//           id: 'uuid-entry',
//           type: 'PAYMENT',
//           amount: 500,
//           balanceAfter: 2500.75,
//           description: 'Pago parcial',
//           createdAt: '2025-12-29T20:30:00Z'
//         }
//       ]
//     }
//   }
// })
// async getSummary(
//   @Param('clientId') clientId: string,
//   @Query('limit') limit?: number,
// ) {
//   return this.service.getSummary(clientId, limit);
// }

// }


//ref
import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { AccountEntryService } from './acount-entry.service';
import { CreateAccountEntryDto } from './dto/create-acount-entry.dto';
import { AccountEntry } from './entities/acount-entry.entity';

@ApiTags('Account Entries')
@Controller('account-entries')
export class AccountEntryController {
  constructor(private readonly service: AccountEntryService) {}

  @Post()
  @ApiOperation({ summary: 'Crear movimiento de cuenta corriente' })
  create(@Body() dto: CreateAccountEntryDto) {
    return this.service.create(dto);
  }

  @Get('client/:clientId')
  @ApiOperation({ summary: 'Cuenta corriente del cliente' })
  findByClient(@Param('clientId') clientId: string) {
    return this.service.findByClient(clientId);
  }

  @Get('history/:clientId')
  @ApiOperation({ summary: 'Historial de movimientos de cuenta corriente de un cliente' })
  @ApiParam({ name: 'clientId', description: 'ID del cliente', type: String })
  @ApiQuery({ name: 'start', required: false, description: 'Fecha inicio (YYYY-MM-DD)' })
  @ApiQuery({ name: 'end', required: false, description: 'Fecha fin (YYYY-MM-DD)' })
  @ApiResponse({ status: 200, description: 'Lista de movimientos', type: [AccountEntry] })
  async getHistory(
    @Param('clientId') clientId: string,
    @Query('start') start?: string,
    @Query('end') end?: string,
  ) {
    return this.service.getHistory(
      clientId,
      start ? new Date(start) : undefined,
      end ? new Date(end) : undefined,
    );
  }

  // 🔹 RUTA DIFERENCIADA (antes chocaba)
  @Get('summary/:clientId/monthly')
  @ApiOperation({ summary: 'Resumen mensual de compras, pagos y deuda de un cliente' })
  @ApiParam({ name: 'clientId', description: 'ID del cliente', type: String })
  @ApiQuery({ name: 'month', required: true, description: 'Mes (1-12)', type: Number })
  @ApiQuery({ name: 'year', required: true, description: 'Año (YYYY)', type: Number })
  async getMonthlySummary(
    @Param('clientId') clientId: string,
    @Query('month') month: string,
    @Query('year') year: string,
  ) {
    return this.service.getMonthlySummary(
      clientId,
      Number(month),
      Number(year),
    );
  }

  @Get('summary/:clientId')
  @ApiOperation({ summary: 'Resumen general de cuenta corriente de un cliente' })
  @ApiParam({ name: 'clientId', description: 'ID del cliente', type: String })
  @ApiQuery({ name: 'limit', required: false, description: 'Cantidad de movimientos recientes a mostrar', type: Number })
  async getSummary(
    @Param('clientId') clientId: string,
    @Query('limit') limit?: string,
  ) {
    return this.service.getSummary(clientId, Number(limit) || 10);
  }
}
