import { IsOptional, IsDateString } from "class-validator";
import { IsNumber } from "class-validator";

export class AccountStatementQueryDto {
  @IsOptional()
  @IsDateString()
  from?: string;

  @IsOptional()
  @IsDateString()
  to?: string;

  @IsOptional()
  @IsNumber()
  limit?: number;
}
