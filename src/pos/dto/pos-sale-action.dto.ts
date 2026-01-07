import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsNumber,
  IsString,
} from 'class-validator';

export class PosSaleActionDto {
  @ApiProperty({
    enum: ['NO_PAYMENT', 'PAY'],
  })
  @IsEnum(['NO_PAYMENT', 'PAY'])
  action: 'NO_PAYMENT' | 'PAY';

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  amount?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  paymentMethod?: string;

  // @ApiPropertyOptional()
  // @IsOptional()
  // @IsString()
  // receivedBy?: string;
}
