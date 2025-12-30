import { Injectable } from '@nestjs/common';
import { SalesService } from 'src/sale/sale.service';
import { CreateSaleItemDto } from './dto/create-sale-item.dto';

@Injectable()
export class SaleItemService {
  constructor(
    private readonly salesService: SalesService,
  ) {}

  create(saleId: string, dto: CreateSaleItemDto) {
    return this.salesService.addItem(saleId, dto);
  }

  remove(itemId: string) {
    return this.salesService.removeItem(itemId);
  }
}
