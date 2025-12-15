import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsOptional, IsInt, IsNumber } from 'class-validator';

export class CreatePurchaseItemDto {
  @ApiProperty({ description: "UUID de la compra asociada" })
  @IsUUID()
  purchaseId: string;

  @ApiProperty({ description: "ID del producto (nullable)", example: "prod-456", required: false })
  @IsOptional()
  @IsString()
  productId?: string;

  @ApiProperty({ description: "Descripción libre del producto", example: "Bolsa de cemento" })
  @IsString()
  description: string;

  @ApiProperty({ description: "Cantidad", example: 20 })
  @IsInt()
  qty: number;

  @ApiProperty({ description: "Costo unitario", example: 1200.00 })
  @IsNumber()
  unitCost: number;

  @ApiProperty({ description: "Total de la línea", example: 24000.00 })
  @IsNumber()
  lineTotal: number;
}



