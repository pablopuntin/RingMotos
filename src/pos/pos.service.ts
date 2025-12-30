import {
  Injectable,
  ConflictException,
} from '@nestjs/common';

import { SalesService } from 'src/sale/sale.service';
import { PaymentService } from 'src/payment/payment.service';
import { PosSaleActionDto } from './dto/pos-sale-action.dto';

@Injectable()
export class PosService {
  constructor(
    private readonly salesService: SalesService,
    private readonly paymentService: PaymentService,
  ) {}

  async handleSaleAction(
    saleId: string,
    dto: PosSaleActionDto,
  ) {
    // 1️⃣ Confirmar venta siempre
    const sale = await this.salesService.confirm(saleId);

    switch (dto.action) {
      case 'NO_PAYMENT':
        return sale;

      case 'PAY':
        if (!dto.amount || dto.amount <= 0) {
          throw new ConflictException('Monto inválido');
        }

        if (!dto.paymentMethod || !dto.receivedBy) {
          throw new ConflictException(
            'paymentMethod y receivedBy son obligatorios',
          );
        }

        await this.paymentService.create({
          amount: dto.amount,
          paymentMethod: dto.paymentMethod,
          receivedBy: dto.receivedBy,
          allocations: [
            {
              saleId: sale.id,
              amount: dto.amount,
            },
          ],
        });

        return this.salesService.findOne(sale.id);
    }
  }
}
