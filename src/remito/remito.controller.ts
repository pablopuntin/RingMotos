// remitos/remitos.controller.ts
import { Controller, Post, Body, Param } from '@nestjs/common';
import { RemitosService } from './remito.service';

@Controller('remitos')
export class RemitosController {
  constructor(private readonly service: RemitosService) {}

  @Post()
  create(@Body() dto: { saleId: string; remitoNumber?: string; format?: string }) {
    return this.service.createForSale(dto.saleId, dto.remitoNumber, dto.format);
  }

  @Post(':id/printed')
  markPrinted(@Param('id') id: string) {
    return this.service.markPrinted(id);
  }
}
