// import { ApiProperty } from "@nestjs/swagger";
// import { IsOptional, IsNumber } from "class-validator";

// export class AddSaleItemDto {
//   @ApiProperty()
//   @IsOptional()
//   productId?: string;

//   @ApiProperty()
//   description: string;

//   @ApiProperty()
//   @IsNumber()
//   qty: number;

//   @ApiProperty()
//   @IsNumber()
//   unitPrice: number;
// }


//ref
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, IsNumber, Min } from 'class-validator';

export class AddSaleItemDto {
  @ApiPropertyOptional({ required: false })
  @IsOptional()
  @IsString()
  productId?: string;

  @ApiProperty({ example: 'Caja de tornillos' })
  @IsString()
  description: string;

  @ApiProperty({ example: 10 })
  @IsInt()
  @Min(1)
  qty: number;

  @ApiProperty({ example: 25.5 })
  @IsNumber()
  @Min(0)
  unitPrice: number;
}
