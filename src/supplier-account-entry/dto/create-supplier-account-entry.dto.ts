import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsEnum, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateSupplierAccountEntryDto {
  @ApiProperty({ description: "UUID del proveedor asociado" })
  @IsUUID()
  supplierId: string;

  @ApiProperty({ description: "UUID de la compra asociada (nullable)", required: false })
  @IsOptional()
  @IsUUID()
  purchaseId?: string;

  @ApiProperty({ description: "UUID del pago asociado (nullable)", required: false })
  @IsOptional()
  @IsUUID()
  supplierPaymentId?: string;

  @ApiProperty({ description: "Tipo de movimiento", example: "DEBT", enum: ['DEBT', 'PAYMENT'] })
  @IsEnum(['DEBT', 'PAYMENT'])
  type: string;

  @ApiProperty({ description: "Monto del movimiento", example: 3000.00 })
  @IsNumber()
  amount: number;

  @ApiProperty({ description: "Balance después del movimiento", example: 12000.00 })
  @IsNumber()
  balanceAfter: number;

  @ApiProperty({ description: "Descripción del movimiento", example: "Pago parcial de compra" })
  @IsString()
  description: string;
}
