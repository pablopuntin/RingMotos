import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsNumber } from 'class-validator';

export class CreateSupplierDto {
  @ApiProperty({ description: "Nombre del proveedor", example: "Ferretería López" })
  @IsString()
  name: string;

  @ApiProperty({ description: "CUIT del proveedor", example: "20-12345678-9" })
  @IsString()
  cuit: string;

  @ApiProperty({ description: "Teléfono del proveedor", example: "3857408499" })
  @IsString()
  phone: string;

  @ApiProperty({ description: "Correo electrónico del proveedor", example: "proveedor@mail.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ description: "Dirección del proveedor", example: "Av. Belgrano 123" })
  @IsString()
  address: string;

  @ApiProperty({ description: "Deuda total del proveedor en caché", example: 5000.00, required: false })
  @IsOptional()
  @IsNumber()
  totalDebtCache?: number;
}
