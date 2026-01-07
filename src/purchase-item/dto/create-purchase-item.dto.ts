import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsOptional, IsString, IsNumber, Min } from 'class-validator';

export class CreatePurchaseItemDto {
  @ApiPropertyOptional({
    description: 'ID de producto (opcional)',
    example: 'uuid-producto',
  })
  @IsOptional()
  @IsUUID()
  productId?: string;

  @ApiProperty({
    description: 'Descripción libre del producto',
    example: 'Bolsa de cemento',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Cantidad',
    example: 20,
    minimum: 0.0001,
  })
  @IsNumber()
  @Min(0.0001)
  qty: number;

  @ApiProperty({
    description: 'Costo unitario',
    example: 1200.0,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  unitCost: number;

  @ApiProperty({
    description: 'Total de la línea',
    example: 24000.0,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  lineTotal: number;
}
