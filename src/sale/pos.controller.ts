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
  @Post('ventas/:id/items')
  @ApiOperation({ summary: 'Agregar ítem a la venta (POS)' })
  async addItem(
    @Param('id') saleId: string,
    @Body() dto: AddSaleItemDto,
  ) {
    return this.salesService.addItem(saleId, dto);
  }

  /* =====================================
     💰 REGISTRAR PAGO (TOTAL o PARCIAL)
  ====================================== */
  @Post('ventas/:id/pagos')
  @ApiOperation({ summary: 'Registrar pago total o parcial' })
  async registrarPago(
    @Param('id') saleId: string,
    @Body() dto: CreatePaymentDto,
  ) {
    /**
     * 1️⃣ Confirmar venta (si no estaba confirmada)
     *    - Crea AccountEntry CHARGE
     *    - Genera deuda
     */
    await this.salesService.confirm(saleId);

    /**
     * 2️⃣ Validación simple:
     *    No permitir pagar 0
     */
    if (dto.amount <= 0) {
      throw new BadRequestException('El monto debe ser mayor a 0');
    }

    /**
     * 3️⃣ Delegar TODO al PaymentService
     *    (total o parcial es lo mismo)
     */
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
