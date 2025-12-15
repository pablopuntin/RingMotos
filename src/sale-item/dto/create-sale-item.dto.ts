import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsOptional, IsInt, IsNumber } from 'class-validator';

export class CreateSaleItemDto {
  @ApiProperty({ description: "UUID de la venta asociada" })
  @IsUUID()
  saleId: string;

  @ApiProperty({ description: "ID del producto (nullable)", example: "prod-123", required: false })
  @IsOptional()
  @IsString()
  productId?: string;

  @ApiProperty({ description: "Descripción libre del producto", example: "Caja de tornillos" })
  @IsString()
  description: string;

  @ApiProperty({ description: "Cantidad", example: 10 })
  @IsInt()
  qty: number;

  @ApiProperty({ description: "Precio unitario", example: 25.50 })
  @IsNumber()
  unitPrice: number;

  @ApiProperty({ description: "Total de la línea", example: 255.00 })
  @IsNumber()
  lineTotal: number;
}
