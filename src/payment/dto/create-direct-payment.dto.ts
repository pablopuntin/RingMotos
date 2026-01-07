// import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// import {
//   IsUUID,
//   IsNumber,
//   IsPositive,
//   IsString,
//   IsNotEmpty,
//   IsOptional,
//   MaxLength,
// } from 'class-validator';

// export class CreateDirectPaymentDto {
//   @ApiProperty({
//     description: 'ID del cliente',
//     example: 'ad8b0be7-4ba9-4746-8b27-de4d4f44f3f4',
//   })
//   @IsUUID()
//   clientId: string;

//   @ApiProperty({
//     description: 'Monto del pago (debe ser mayor a 0)',
//     example: 500,
//   })
//   @IsNumber()
//   @IsPositive()
//   amount: number;

//   @ApiProperty({
//     description: 'Método de pago',
//     example: 'CASH',
//   })
//   @IsString()
//   @IsNotEmpty()
//   paymentMethod: string;

//   @ApiProperty({
//     description: 'Usuario que recibe el pago',
//     example: 'cf28836b-0066-4e08-bbeb-6e2cd337a345',
//   })
//   @IsUUID()
//   receivedBy: string;

//   @ApiPropertyOptional({
//     description: 'Descripción opcional del pago',
//     example: 'Entrega a cuenta corriente',
//     maxLength: 255,
//   })
//   @IsOptional()
//   @IsString()
//   @MaxLength(255)
//   description?: string;
// }


//ref
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsUUID,
  IsNumber,
  IsPositive,
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
} from 'class-validator';

export class CreateDirectPaymentDto {
  @ApiProperty({
    description: 'ID del cliente',
    example: '60d40d98-1059-48c9-95a3-ca9d35743072',
  })
  @IsUUID()
  clientId: string;

  @ApiProperty({
    description: 'Monto del pago (debe ser mayor a 0)',
    example: 30000,
  })
  @IsNumber()
  @IsPositive()
  amount: number;

  @ApiProperty({
    description: 'Método de pago',
    example: 'CASH',
  })
  @IsString()
  @IsNotEmpty()
  paymentMethod: string;

  @ApiPropertyOptional({
    description: 'Descripción opcional del pago',
    example: 'prueba saldo deberia ser cero',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;
}
