import { ApiProperty } from '@nestjs/swagger';

class SupplierStatementItemDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ enum: ['PURCHASE_CONFIRMED', 'SUPPLIER_PAYMENT', 'ADJUSTMENT'] })
  type: string;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  description: string;

  @ApiProperty()
  debit: string;  // Lo que el proveedor nos cobra (compra)

  @ApiProperty()
  credit: string; // Lo que le pagamos

  @ApiProperty()
  balanceAfter: string;

  @ApiProperty({ required: false })
  purchase?: any;

  @ApiProperty({ required: false })
  payment?: any;

  @ApiProperty({ required: false })
  summary?: {
    pagoRealizado?: string;
    deudaAnterior?: string;
    deudaActual?: string;
    [key: string]: any;
  };
}

export class SupplierAccountStatementResponseDto {
  @ApiProperty()
  supplier: {
    id: string;
    name: string;
  };

  @ApiProperty({ type: [SupplierStatementItemDto] })
  movements: SupplierStatementItemDto[];

  @ApiProperty()
  finalBalance: string;
}
