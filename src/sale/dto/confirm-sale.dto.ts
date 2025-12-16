import { IsOptional } from "class-validator";

export class ConfirmSaleDto {
  @IsOptional()
  note?: string;
}
