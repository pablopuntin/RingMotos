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
     ➕ AGREGAR ÍTEM
  ====================================== */
  // @Post('ventas/:id/items')
  // @ApiOperation({ summary: 'Agregar ítem a la venta (POS)' })
  // async addItem(
  //   @Param('id') saleId: string,
  //   @Body() dto: AddSaleItemDto,
  // ) {
  //   return this.salesService.addItem(saleId, dto);
  // }

  /* =====================================
     💰 REGISTRAR PAGO (TOTAL o PARCIAL)
  ====================================== */
 @Post('ventas/:id/pagos')
@ApiOperation({ summary: 'Registrar pago total o parcial' })
async registrarPago(
  @Param('id') saleId: string,
  @Body() dto: CreatePaymentDto,
) {
  // 1️⃣ Confirmar venta (regla de negocio en SalesService)
  await this.salesService.confirm(saleId);

  // 2️⃣ Delegar TODO al PaymentService
  return this.paymentService.create({
    ...dto,
    allocations: [
      {
        saleId,
        amount: dto.amount,
      },
    ],
  });
}

}
