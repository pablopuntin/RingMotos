import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsUUID, IsNumber, IsOptional } from "class-validator";

export class ApplyInterestDto {
  @ApiPropertyOptional({ description: 'Identificador único del cliente', example: 'uuid-cliente' })
  @IsUUID()
  clientId: string;

  @ApiPropertyOptional({ description: 'Monto de interés ', example: 15 })
  @IsNumber()
  @IsOptional()
  percentage?: number;   // ahora opcional

   @ApiPropertyOptional({ description: 'Monto de interés o ajuste', example: 1500.75 })
  @IsNumber()
  @IsOptional()
  amount?: number; 

  @ApiPropertyOptional({ description: 'Descripción del movimiento', example: 'Interés por mora' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'ID de la venta asociada (si aplica)', example: 'uuid-venta' })
  @IsUUID()
  @IsOptional()
  saleId?: string;
}
