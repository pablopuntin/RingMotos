// dto/reset-password.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';


export class ResetPasswordDto {

 @ApiProperty({
      example: 'hashed_password_123',
      description: 'Contraseña del usuario (solo si es autenticación interna)'
          })
  @IsString()
  @MinLength(6)
  newPassword: string;
}
