// import { ApiProperty } from '@nestjs/swagger';
// import { IsOptional } from 'class-validator';
// import { IsString } from 'class-validator';

// export class CreateClientDto {
//   @ApiProperty({
//     description: 'Número de DNI',
//     example: '22555999',
//     required: false
//   })
//   dni?: string;

//   @ApiProperty({
//     description: 'Nombre del cliente',
//     example: 'Juan'
//   })
//   name: string;

//   @ApiProperty({
//     description: 'Apellido del cliente',
//     example: 'Perez'
//   })
//   lastName: string;

//    @ApiProperty({
//     description: 'direccion del cliente',
//     example: 'lote 41',
//     required: false
//   })
//   address?: string;

//   @ApiProperty({
//     description: 'Teléfono del cliente solo números, sin guiones, paréntesis o comas',
//     example: '3857408499',
//     required: false
//   })
//   phone?: string;

//   @ApiProperty({
//     description: 'Correo electrónico del cliente (opcional)',
//     example: 'perez@mail.com',
//     required: false
//   })
//   email?: string;

//    @ApiProperty({ description: 'Url de la imagen del producto',
//       example: 'https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-pic-design-profile-vector-png-image_40966566.jpg',
//        required: false})
//   @IsOptional()
//   @IsString()
//   imgURL?: string;

// }

//refactor
import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsEmail,
} from 'class-validator';

export class CreateClientDto {
  @ApiProperty({ example: '22555999', required: false })
  @IsOptional()
  @IsString()
  dni?: string;

  @ApiProperty({ example: 'Juan' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Perez' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'Lote 41', required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ example: '3857408499', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: 'perez@mail.com', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  imgUrl?: string;
}
