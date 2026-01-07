import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePurchaseItemDto } from 'src/purchase-item/dto/create-purchase-item.dto';

export class CreatePurchaseDto {
  @ApiProperty({
    description: 'UUID del proveedor asociado',
    example: 'uuid-proveedor',
  })
  @IsUUID()
  supplierId: string;

  @ApiProperty({
    type: [CreatePurchaseItemDto],
    description: 'Lista de ítems de compra',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePurchaseItemDto)
  items: CreatePurchaseItemDto[];
}
