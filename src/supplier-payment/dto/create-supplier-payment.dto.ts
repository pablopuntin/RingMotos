// import { ApiProperty } from '@nestjs/swagger';
// import { IsUUID, IsString, IsNumber, IsEnum, IsDateString } from 'class-validator';

// export class CreateSupplierPaymentDto {
//   @ApiProperty({ description: "UUID del proveedor asociado al pago" })
//   @IsUUID()
//   supplierId: string;

//   @ApiProperty({ description: "Caja registradora asociada (FK)", example: "cash-002" })
//   @IsString()
//   cashRegisterId: string;

//   @ApiProperty({ description: "Monto del pago", example: 5000.00 })
//   @IsNumber()
//   amount: number;

//   @ApiProperty({ description: "Método de pago", example: "TRANSFER" })
//   @IsString()
//   paymentMethod: string;

//   @ApiProperty({ description: "Fecha del pago", example: "2025-12-12T20:35:00.000Z" })
//   @IsDateString()
//   paymentDate: Date;

//   @ApiProperty({ description: "Estado del pago", example: "COMPLETED", enum: ['COMPLETED', 'REVERSED'] })
//   @IsEnum(['COMPLETED', 'REVERSED'])
//   status: string;
// }


//ref
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNumber, IsEnum } from 'class-validator';

export enum SupplierPaymentMethod {
  CASH = 'CASH',
  TRANSFER = 'TRANSFER',
  CARD = 'CARD',
  CHECK = 'CHECK',
}

export class CreateSupplierPaymentDto {
  @ApiProperty({ description: "UUID del proveedor asociado al pago" })
  @IsUUID()
  supplierId: string;

  @ApiProperty({ description: "Monto del pago" })
  @IsNumber()
  amount: number;

  @ApiProperty({
    description: "Método de pago",
    enum: SupplierPaymentMethod,
    example: SupplierPaymentMethod.TRANSFER,
  })
  @IsEnum(SupplierPaymentMethod)
  paymentMethod: SupplierPaymentMethod;
}
