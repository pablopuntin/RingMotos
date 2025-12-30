import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsEmail,
  IsNotEmpty,
} from 'class-validator';

export class CreateClientDto {
  @ApiProperty({
    description: 'Documento Nacional de Identidad del cliente',
    example: '22555999',
    required: false
  })
  @IsOptional()
  @IsString()
  dni?: string;

  @ApiProperty({
    description: 'Nombre del cliente',
    example: 'Juan'
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Apellido del cliente',
    example: 'Perez'
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'Dirección del cliente',
    example: 'Lote 41',
    required: false
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    description: 'Teléfono de contacto',
    example: '3857408499',
    required: false
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({
    description: 'Correo electrónico del cliente',
    example: 'perez@mail.com',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: 'URL de la imagen del cliente (subida a Cloudinary)',
    example: 'https://res.cloudinary.com/demo/image/upload/v1234567890/client-uuid.png',
    required: false
  })
  @IsOptional()
  @IsString()
  imgUrl?: string;
}
