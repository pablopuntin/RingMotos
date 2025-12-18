// remitos/remitos.service.ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Remito } from './entities/remito.entity';
import { Sale } from 'src/sale/entities/sale.entity';

@Injectable()
export class RemitosService {
  constructor(
    @InjectRepository(Remito) private readonly remitoRepo: Repository<Remito>,
    @InjectRepository(Sale) private readonly saleRepo: Repository<Sale>,
  ) {}

  async createForSale(saleId: string, remitoNumber?: string, format = 'A4') {
    const sale = await this.saleRepo.findOneByOrFail({ id: saleId });
    const number = remitoNumber ?? await this.generateNumber();
    const remito = this.remitoRepo.create({ sale, remitoNumber: number, format, status: 'PENDING' });
    return this.remitoRepo.save(remito);
  }

  async markPrinted(remitoId: string) {
    const remito = await this.remitoRepo.findOneByOrFail({ id: remitoId });
    remito.status = 'PRINTED';
    remito.printedAt = new Date();
    return this.remitoRepo.save(remito);
  }

  private async generateNumber() {
    // Ejemplo simple: prefijo y timestamp
    return `R-${Date.now()}`;
  }
}
