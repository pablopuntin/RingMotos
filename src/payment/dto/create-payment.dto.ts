// import { ApiProperty } from '@nestjs/swagger';
// import { IsString, IsUUID, IsNumber, IsOptional } from 'class-validator';

// export class CreatePaymentDto {
//   @ApiProperty({ example: 1500 })
//   @IsNumber()
//   amount: number;

//   @ApiProperty({ example: 'CASH' })
//   @IsString()
//   paymentMethod: string;

//   @ApiProperty({ example: 'user-uuid' })
//   @IsUUID()
//   receivedBy: string;

//   // @ApiProperty({ example: 'cash-register-uuid' })
//   // @IsUUID()
//   // cashRegisterId: string;

//   @ApiProperty({
//     description: 'Aplicaciones del pago a ventas',
//     example: [{ saleId: 'sale-uuid', amount: 1500 }],
//   })
//   allocations: {
//     saleId: string;
//     amount: number;
//   }[];
// }

//REF
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNumber,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class PaymentAllocationDto {
  @ApiProperty()
  @IsString()
  saleId: string;

  @ApiProperty()
  @IsNumber()
  @Min(0.01)
  amount: number;
}

export class CreatePaymentDto {
  @ApiProperty()
  @IsNumber()
  @Min(0.01)
  amount: number;

  @ApiProperty({ enum: ['CASH', 'CARD', 'TRANSFER'] })
  @IsString()
  paymentMethod: string;

  @ApiProperty()
  @IsUUID()
  receivedBy: string;

  // 🔥 ESTO ES LO QUE FALTABA
  @ApiProperty({ type: [PaymentAllocationDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PaymentAllocationDto)
  allocations: PaymentAllocationDto[];
}
