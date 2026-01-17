// import { IsString, IsOptional, IsObject } from 'class-validator';

// export class CreateRemitoDto {
//   // @IsString()
//   // type: 'SALE_FINALIZED' | 'DIRECT_PAYMENT';

//   @IsString()
//    type:
//     | 'SALE_FINALIZED'
//     | 'DIRECT_PAYMENT'
//     | 'PURCHASE_CONFIRMED'
//     | 'SUPPLIER_PAYMENT'; // lo vamos a usar después
//   @IsOptional()
//   @IsString()
//   saleId?: string;

//   @IsOptional()
//   @IsString()
//   paymentId?: string;

//   @IsString()
//   clientId: string;

//   @IsObject()
//   snapshot: any;
// }

//REF
import { IsString, IsOptional, IsObject } from 'class-validator';

export class CreateRemitoDto {
  @IsString()
  type:
    | 'SALE_FINALIZED'
    | 'DIRECT_PAYMENT'
    | 'PURCHASE_CONFIRMED'
    | 'SUPPLIER_PAYMENT';

  @IsOptional()
  @IsString()
  saleId?: string;

  @IsOptional()
  @IsString()
  paymentId?: string;

  @IsOptional()
  @IsString()
  purchaseId?: string;   // ✅ NUEVO

  @IsOptional()
  @IsString()
  clientId?: string;

  @IsOptional()
  @IsString()
  supplierId?: string;   // ya lo habíamos agregado

  @IsObject()
  snapshot: any;
}
