import { ApiProperty } from '@nestjs/swagger';
export class CreateAccountEntryDto {
  @ApiProperty({
    description: 'Cliente asociado',
    example: 'uuid-del-cliente',
  })
  clientId: string;

  @ApiProperty({
    description: 'Tipo de movimiento',
    example: 'CHARGE',
    enum: ['CHARGE', 'PAYMENT', 'ADJUSTMENT'],
  })
  type: string;

  @ApiProperty({
    description: 'Venta asociada (nullable)',
    example: 'uuid-de-la-venta',
    required: false,
  })
  saleId?: string;

  @ApiProperty({
    description: 'Pago asociado (nullable)',
    example: 'uuid-del-pago',
    required: false,
  })
  paymentId?: string;

  @ApiProperty({
    description: 'Monto del movimiento',
    example: 250.0,
  })
  amount: number;

  @ApiProperty({
    description: 'Balance después del movimiento',
    example: 1250.0,
  })
  balanceAfter: number;

  @ApiProperty({
    description: 'Descripción del movimiento',
    example: 'Pago parcial de factura',
  })
  description: string;

  @ApiProperty({
    description: 'Estado del movimiento',
    example: 'ACTIVE',
  })
  status: string;
}
