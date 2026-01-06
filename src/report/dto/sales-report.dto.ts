import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsDateString } from 'class-validator';

export class SalesReportQueryDto {
  @ApiPropertyOptional({
    example: '2026-01-01',
  })
  @IsOptional()
  @IsDateString()
  from?: string;

  @ApiPropertyOptional({
    example: '2026-01-31',
  })
  @IsOptional()
  @IsDateString()
  to?: string;

  @IsOptional()
  userId?: string;
}
