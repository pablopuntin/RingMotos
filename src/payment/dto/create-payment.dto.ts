import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsNumber, IsOptional } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({ example: 1500 })
  @IsNumber()
  amount: number;

  @ApiProperty({ example: 'CASH' })
  @IsString()
  paymentMethod: string;

  @ApiProperty({ example: 'user-uuid' })
  @IsUUID()
  receivedBy: string;

  @ApiProperty({ example: 'cash-register-uuid' })
  @IsUUID()
  cashRegisterId: string;

  @ApiProperty({
    description: 'Aplicaciones del pago a ventas',
    example: [{ saleId: 'sale-uuid', amount: 1500 }],
  })
  allocations: {
    saleId: string;
    amount: number;
  }[];
}
