import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsEnum, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreatePurchaseDto {
  @ApiProperty({ description: "UUID del proveedor asociado" })
  @IsUUID()
  supplierId: string;

  @ApiProperty({ description: "Estado de la compra", example: "CONFIRMED", enum: ['DRAFT', 'CONFIRMED'] })
  @IsEnum(['DRAFT', 'CONFIRMED'])
  status: string;

  @ApiProperty({ description: "Monto total de la compra", example: 3500.00 })
  @IsNumber()
  totalAmount: number;

  @ApiProperty({ description: "Fecha de confirmación de la compra", example: "2025-12-12T20:30:00.000Z", required: false })
  @IsOptional()
  @IsDateString()
  confirmedAt?: Date;
}

import { PartialType } from '@nestjs/swagger';


