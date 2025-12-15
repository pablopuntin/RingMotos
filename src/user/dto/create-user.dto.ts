import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Juan'
  })
  @IsNotEmpty()
  firstname: string;

  @ApiProperty({
    description: 'Apellido del usuario',
    example: 'Perez'
  })
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({
    description: 'Correo electrónico',
    example: 'juanperez@mail.com'
  })
  @IsEmail({}, { message: 'Email must be valid' })
  email: string;

  @ApiPropertyOptional({
    description: 'Contraseña',
    example: 'Mypass123'
  })
   @IsNotEmpty()
  password: string;

 
}
