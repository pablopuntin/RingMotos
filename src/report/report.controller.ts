import {
  Controller,
  Get,
  Query,
  Param,
  BadRequestException,
  NotImplementedException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';

import { ReportsService } from './report.service';
import { CashReportQueryDto } from './dto/cash-report.dto';
import { SalesReportQueryDto } from './dto/sales-report.dto';
import { resolveDateRange } from 'src/common/utils/date-money.utils';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { AuthSwagger } from 'src/auth/decorators/auth-swagger.decorator';
import { UseGuards } from '@nestjs/common';


@ApiTags('Reports')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  /* =========================
     💰 CAJA
  ========================== */

  @Get('cash/daily')
  @ApiOperation({
    summary: 'Reporte diario de caja',
    description:
      'Devuelve total de ingresos, egresos y balance neto de un día específico.',
  })
  @ApiQuery({
    name: 'date',
    example: '2026-01-03',
    description: 'Fecha del reporte (YYYY-MM-DD)',
    required: true,
  })
  @ApiResponse({ status: 200 })
  getDailyCash(@Query() query: CashReportQueryDto) {
    if (!query.date) {
      throw new BadRequestException('date es obligatorio');
    }

    return this.reportsService.getDailyCashReport(query.date);
  }

  /* =========================
     📊 VENTAS
  ========================== */

  @Get('sales/range')
  @ApiOperation({
    summary: 'Reporte de ventas por rango',
    description:
      'Devuelve totales de ventas, cobrado y pendiente en un período. Si no se envía rango, toma el último año.',
  })
  @ApiResponse({ status: 200 })
  getSalesByRange(@Query() query: SalesReportQueryDto) {
    return this.reportsService.getSalesReport(query);
  }

  /* =========================
     📊 VENTAS POR CLIENTE
  ========================== */

  @Get('sales/by-client')
  @ApiOperation({
    summary: 'Ventas agrupadas por cliente',
    description:
      'Devuelve ventas agrupadas por cliente en un rango de fechas.',
  })
  @ApiQuery({ name: 'from', required: false, example: '2026-01-01' })
  @ApiQuery({ name: 'to', required: false, example: '2026-01-31' })
  @ApiResponse({ status: 200 })
  getSalesGroupedByClient(@Query() query: SalesReportQueryDto) {
    const { from, to } = resolveDateRange(query.from, query.to);
    return this.reportsService.getSalesByUser(from, to);
  }

  @Get('sales/by-client/:clientId')
  @ApiOperation({
    summary: 'Ventas de un cliente',
    description:
      'Devuelve las ventas de un cliente específico en un rango de fechas.',
  })
  @ApiParam({
    name: 'clientId',
    description: 'ID del cliente',
    example: 'uuid-del-cliente',
  })
  @ApiQuery({ name: 'from', required: false, example: '2026-01-01' })
  @ApiQuery({ name: 'to', required: false, example: '2026-01-31' })
  @ApiResponse({ status: 200 })
  getSalesBySingleClient(
    @Param('clientId') clientId: string,
    @Query() query: SalesReportQueryDto,
  ) {
    const { from, to } = resolveDateRange(query.from, query.to);
    return this.reportsService.getSalesByUser(from, to, clientId);
  }

  /* =========================
     👤 VENTAS POR VENDEDOR
  ========================== */

  @AuthSwagger()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('superadmin')
  @Get('sales/by-user')
  @ApiOperation({
    summary: 'Ventas agrupadas por vendedor',
    description:
      'Devuelve ventas agrupadas por usuario/vendedor en un rango de fechas.',
  })
  @ApiQuery({
  name: 'userId',
  required: false,
  description: 'ID del vendedor (opcional)',
})
  @ApiQuery({ name: 'from', required: false, example: '2026-01-01' })
  @ApiQuery({ name: 'to', required: false, example: '2026-01-31' })
  @ApiResponse({ status: 200 })
 getSalesByUser(@Query() query: SalesReportQueryDto) {
  const { from, to } = resolveDateRange(query.from, query.to);
  return this.reportsService.getSalesByUser(
    from,
    to,
    query.userId,
  );
}

  /* =========================
     📦 TOP PRODUCTS (FASE 2)
  ========================== */

  @Get('sales/top-products')
  @ApiOperation({
    summary: 'Top productos más vendidos (pendiente)',
    description: `
Devuelve los productos más vendidos por cantidad o monto.

Requiere:
- módulo de productos
- relación SaleItem -> Product
- stock implementado

Se implementará en fase 2 del sistema.
    `,
  })
  @ApiResponse({
    status: 501,
    description: 'No implementado',
  })
  getTopProducts() {
    throw new NotImplementedException(
      'Reporte pendiente de implementar',
    );
  }
}
