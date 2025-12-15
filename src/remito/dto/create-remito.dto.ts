import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsEnum, IsOptional, IsDateString } from 'class-validator';

export class CreateRemitoDto {
  @ApiProperty({ description: "Número de remito", example: "0001-00001234" })
  @IsString()
  remitoNumber: string;

  @ApiProperty({ description: "Formato del remito", example: "A4" })
  @IsString()
  format: string;

  @ApiProperty({ description: "Estado del remito", example: "PRINTED", enum: ['PENDING', 'PRINTED'] })
  @IsEnum(['PENDING', 'PRINTED'])
  status: string;

  @ApiProperty({ description: "Fecha de impresión", example: "2025-12-12T20:20:00.000Z", required: false })
  @IsOptional()
  @IsDateString()
  printedAt?: Date;

  @ApiProperty({ description: "UUID de la venta asociada" })
  @IsUUID()
  saleId: string;
}