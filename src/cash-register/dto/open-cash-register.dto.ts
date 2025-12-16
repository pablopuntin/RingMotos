import { ApiProperty } from '@nestjs/swagger';

export class OpenCashRegisterDto {
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
    description: 'Usuario que abre la caja (ID)',
    example: 'uuid-del-usuario'
  })
  openedBy: string;
}
