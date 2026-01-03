import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsDateString } from 'class-validator';

export class DateRangeDto {
  @ApiPropertyOptional({
    example: '2026-01-01',
    description: 'Fecha inicio (YYYY-MM-DD)',
  })
  @IsOptional()
  @IsDateString()
  from?: string;

  @ApiPropertyOptional({
    example: '2026-01-31',
    description: 'Fecha fin (YYYY-MM-DD)',
  })
  @IsOptional()
  @IsDateString()
  to?: string;
}
