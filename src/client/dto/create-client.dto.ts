import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty({
    description: 'Número de DNI',
    example: '22555999',
    required: false
  })
  dni: number;

  @ApiProperty({
    description: 'Nombre del cliente',
    example: 'Juan'
  })
  name: string;

  @ApiProperty({
    description: 'Apellido del cliente',
    example: 'Perez'
  })
  lastName: string;

   @ApiProperty({
    description: 'direccion del cliente',
    example: 'lote 41',
    required: false
  })
  adress: string;

  @ApiProperty({
    description: 'Teléfono del cliente solo números, sin guiones, paréntesis o comas',
    example: '3857408499',
    required: false
  })
  phone: number;

  @ApiProperty({
    description: 'Correo electrónico del cliente (opcional)',
    example: 'perez@mail.com',
    required: false
  })
  email?: string;
}

