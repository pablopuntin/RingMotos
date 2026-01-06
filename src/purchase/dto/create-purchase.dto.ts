// import { ApiProperty } from '@nestjs/swagger';
// import { IsUUID, IsEnum, IsNumber, IsOptional, IsDateString } from 'class-validator';

// export class CreatePurchaseDto {
//   @ApiProperty({ description: "UUID del proveedor asociado" })
//   @IsUUID()
//   supplierId: string;

//   @ApiProperty({ description: "Estado de la compra", example: "CONFIRMED", enum: ['DRAFT', 'CONFIRMED'] })
//   @IsEnum(['DRAFT', 'CONFIRMED'])
//   status: string;

//   @ApiProperty({ description: "Monto total de la compra", example: 3500.00 })
//   @IsNumber()
//   totalAmount: number;

//   @ApiProperty({ description: "Fecha de confirmación de la compra", example: "2025-12-12T20:30:00.000Z", required: false })
//   @IsOptional()
//   @IsDateString()
//   confirmedAt?: Date;
// }

// import { PartialType } from '@nestjs/swagger';


//ref
import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
  IsArray,
  ValidateNested,
  IsString,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

/* =========================
   DTO Ítem de compra
========================= */

export class CreatePurchaseItemDto {
  @ApiProperty({
    example: 'Harina 000 x 25kg',
    description: 'Descripción libre del ítem',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 2,
    description: 'Cantidad',
    minimum: 0.0001,
  })
  @IsNumber()
  @Min(0.0001)
  qty: number;

  @ApiProperty({
    example: 12500,
    description: 'Costo unitario',
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  unitCost: number;

  @ApiProperty({
    example: 'uuid-producto',
    required: false,
    description: 'ID de producto (opcional, para futura integración con stock)',
  })
  @IsOptional()
  @IsUUID()
  productId?: string;
}

/* =========================
   DTO Crear compra
========================= */

export class CreatePurchaseDto {
  @ApiProperty({
    example: 'uuid-proveedor',
    description: 'Proveedor asociado a la compra',
  })
  @IsUUID()
  supplierId: string;

  @ApiProperty({
    type: [CreatePurchaseItemDto],
    description: 'Ítems de la compra',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePurchaseItemDto)
  items: CreatePurchaseItemDto[];
}
