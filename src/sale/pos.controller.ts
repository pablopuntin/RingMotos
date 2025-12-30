import {
  Controller,
  Post,
  Param,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { SalesService } from './sale.service';
import { PaymentService } from '../payment/payment.service';

import { CreateSaleDto } from './dto/create-sale.dto';
import { AddSaleItemDto } from './dto/create-items.dto';
import { CreatePaymentDto } from '../payment/dto/create-payment.dto';
import { CloseSaleDto } from './dto/close-sale.dto';


@ApiTags('POS')
@Controller('pos')
export class PosController {
  constructor(
    private readonly salesService: SalesService,
    private readonly paymentService: PaymentService,
  ) {}

  /* =====================================
     🧾 NUEVA VENTA (venta + remito auto)
  ====================================== */
  @Post('ventas/nueva')
  @ApiOperation({ summary: 'Iniciar nueva venta (POS)' })
  async nuevaVenta(@Body() dto: CreateSaleDto) {
    return this.salesService.create(dto);
  }

   /* =====================================
     💰 REGISTRAR PAGO (TOTAL o PARCIAL)
  ====================================== */
//  @Post('ventas/:id/pagos')
// @ApiOperation({ summary: 'Registrar pago total o parcial' })
// async registrarPago(
//   @Param('id') saleId: string,
//   @Body() dto: CreatePaymentDto,
// ) {
//   // 1️⃣ Confirmar venta (regla de negocio en SalesService)
//   await this.salesService.confirm(saleId);

//   // 2️⃣ Delegar TODO al PaymentService
//   return this.paymentService.create({
//     ...dto,
//     allocations: [
//       {
//         saleId,
//         amount: dto.amount,
//       }
//     ]
//   });
// }

// @Post('ventas/:id/pagos')
// async cerrarVenta(
//   @Param('id') saleId: string,
//   @Body() dto: CloseSaleDto,
// ) {
//   return this.salesService.closeSale(saleId, dto);
// }


}
