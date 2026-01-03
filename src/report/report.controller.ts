import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { ReportsService } from './report.service';
import { CashReportQueryDto } from './dto/cash-report.dto';
import { SalesReportQueryDto } from './dto/sales-report.dto';
import { BadRequestException } from '@nestjs/common';

@ApiTags('Reports')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  /* =========================
     CAJA
  ========================== */

@Get('cash/daily')
@ApiOperation({
  summary: 'Reporte diario de caja',
  description: 'Devuelve total de ingresos, egresos y balance neto de un día.',
})
@ApiResponse({ status: 200 })
getDailyCash(@Query() query: CashReportQueryDto) {
  if (!query.date) {
    throw new BadRequestException('date es obligatorio');
  }

  return this.reportsService.getDailyCashReport(query.date);
}


  /* =========================
     VENTAS
  ========================== */

  @Get('sales/range')
  @ApiOperation({
    summary: 'Reporte de ventas por rango de fechas',
    description:
      'Devuelve totales de ventas, cobrado y pendiente en un período.',
  })
  @ApiResponse({
    status: 200,
    description: 'Reporte de ventas',
  })
  getSalesByRange(@Query() query: SalesReportQueryDto) {
    return this.reportsService.getSalesReport(query);
  }
}
