import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNumber } from 'class-validator';

export class CreatePaymentAllocationDto {
  @ApiProperty({ description: "UUID del pago asociado" })
  @IsUUID()
  paymentId: string;

  @ApiProperty({ description: "UUID de la venta asociada" })
  @IsUUID()
  saleId: string;

  @ApiProperty({ description: "Monto aplicado a la venta", example: 500.00 })
  @IsNumber()
  amountApplied: number;
}
