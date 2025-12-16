import { ApiProperty } from '@nestjs/swagger';

export class CloseCashRegisterDto {
  @ApiProperty({
    description: 'Observaciones opcionales al cerrar la caja',
    example: 'Cierre de turno tarde',
    required: false
  })
  notes?: string;
}
