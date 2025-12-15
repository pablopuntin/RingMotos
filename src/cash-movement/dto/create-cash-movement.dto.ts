import { ApiProperty } from '@nestjs/swagger';

export class CreateCashMovementDto {
  @ApiProperty({
    description: 'ID de la caja registradora asociada',
    example: 'uuid-de-la-caja',
  })
  cashRegisterId: string;

  @ApiProperty({
    description: 'Tipo de movimiento',
    example: 'IN',
    enum: ['IN', 'OUT']
  })
  type: string;

  @ApiProperty({
    description: 'Monto del movimiento',
    example: 500
  })
  amount: number;

  @ApiProperty({
    description: 'Motivo del movimiento',
    example: 'Pago de cliente',
    required: false
  })
  reason: string;

  @ApiProperty({
    description: 'ID de la venta relacionada (nullable)',
    example: 'uuid-de-la-venta',
    required: false
  })
  relatedSaleId?: string;

  @ApiProperty({
    description: 'ID del pago relacionado (nullable)',
    example: 'uuid-del-pago',
    required: false,
  })
  relatedPaymentId?: string;

  @ApiProperty({
    description: 'ID del pago a proveedor relacionado (nullable)',
    example: 'uuid-del-pago-proveedor',
    required: false,
  })
  relatedSupplierPaymentId?: string;
}
