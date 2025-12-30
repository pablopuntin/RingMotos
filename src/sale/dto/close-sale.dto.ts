import { IsNumber, IsOptional, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CloseSaleDto {
  @ApiPropertyOptional({ example: 1500 })
  @IsOptional()
  amount?: number;
  
  @ApiPropertyOptional({ example: 'CASH' })
  @IsOptional()
  paymentMethod?: string;

  @ApiPropertyOptional({ example: 'uuid-user' })
  @IsOptional()
  receivedBy?: string;
}
