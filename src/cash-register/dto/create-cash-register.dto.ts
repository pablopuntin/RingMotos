import { ApiProperty } from '@nestjs/swagger';

export class CreateCashRegisterDto {
  @ApiProperty({
    description: 'Nombre de la caja',
    example: 'Caja Principal'
  })
  name: string;

  @ApiProperty({
    description: 'Monto de apertura',
    example: 1000
  })
  openingAmount: number;

  @ApiProperty({
    description: 'Estado de la caja',
    example: 'OPEN',
    enum: ['OPEN', 'CLOSED']
  })
  status: string;

  @ApiProperty({
    description: 'Usuario que abrió la caja (ID)',
    example: 'uuid-del-usuario'
  })
  openedBy: string;

  @ApiProperty({
    description: 'Fecha de apertura',
    example: '2025-12-15T09:00:00.000Z'
  })
  openedAt: Date;

  @ApiProperty({
    description: 'Monto de cierre (nullable)',
    example: 1500,
    required: false
  })
  closingAmount?: number;

  @ApiProperty({
    description: 'Fecha de cierre (nullable)',
    example: '2025-12-15T18:00:00.000Z',
    required: false
  })
  closedAt?: Date;
}
