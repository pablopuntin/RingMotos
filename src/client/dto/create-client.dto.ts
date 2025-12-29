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
