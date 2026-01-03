import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsDateString } from 'class-validator';

export class CashReportQueryDto {
  @ApiPropertyOptional({
    example: '2026-01-02',
    description: 'Fecha específica para reporte diario',
  })
  @IsOptional()
  @IsDateString()
  date?: string;
}
