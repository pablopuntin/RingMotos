import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsNumber } from "class-validator";

export class AddSaleItemDto {
  @ApiProperty()
  @IsOptional()
  productId?: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  @IsNumber()
  qty: number;

  @ApiProperty()
  @IsNumber()
  unitPrice: number;
}
