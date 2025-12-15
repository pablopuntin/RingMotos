import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsNumber, IsEnum, IsDateString } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({ description: "Monto del pago", example: 1500.75 })
  @IsNumber()
  amount: number;

  @ApiProperty({ description: "Método de pago", example: "CASH" })
  @IsString()
  paymentMethod: string;

  @ApiProperty({ description: "Usuario que recibió el pago (FK users.id)", example: "user-123" })
  @IsString()
  receivedBy: string;

  @ApiProperty({ description: "Caja registradora asociada (FK cash_registers.id)", example: "cash-001" })
  @IsString()
  cashRegisterId: string;

  @ApiProperty({ description: "Fecha del pago", example: "2025-12-12T20:25:00.000Z" })
  @IsDateString()
  paymentDate: Date;

  @ApiProperty({ description: "Estado del pago", example: "COMPLETED", enum: ['PENDING', 'COMPLETED', 'REVERSED'] })
  @IsEnum(['PENDING', 'COMPLETED', 'REVERSED'])
  status: string;
}
