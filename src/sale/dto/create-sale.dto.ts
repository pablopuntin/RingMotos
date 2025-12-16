// import { ApiProperty } from '@nestjs/swagger';
// import { IsUUID, IsEnum, IsNumber, IsOptional, IsDateString } from 'class-validator';

// export class CreateSaleDto {
//   @ApiProperty({ description: "UUID del cliente asociado a la venta" })
//   @IsUUID()
//   clientId: string;

//   @ApiProperty({ description: "Estado de la venta", example: "CONFIRMED", enum: ['DRAFT', 'CONFIRMED', 'CANCELLED', 'PAID_PARTIAL', 'PAID'] })
//   @IsEnum(['DRAFT', 'CONFIRMED', 'CANCELLED', 'PAID_PARTIAL', 'PAID'])
//   status: string;

//   @ApiProperty({ description: "Monto total de la venta", example: 2500.50 })
//   @IsNumber()
//   totalAmount: number;

//   @ApiProperty({ description: "Monto pagado", example: 1000.00 })
//   @IsNumber()
//   paidAmount: number;

//   @ApiProperty({ description: "Fecha de confirmación de la venta", example: "2025-12-12T20:10:00.000Z", required: false })
//   @IsOptional()
//   @IsDateString()
//   confirmedAt?: Date;

//   @ApiProperty({ description: "Fecha de impresión del comprobante", example: "2025-12-12T20:15:00.000Z", required: false })
//   @IsOptional()
//   @IsDateString()
//   printedAt?: Date;
// }

//ref
import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";
export class CreateSaleDto {
  @ApiProperty({ description: 'UUID del cliente' })
  @IsUUID()
  clientId: string;
}
