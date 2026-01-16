import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Remito } from './entities/remito.entity';
import { CreateRemitoDto } from './dto/create-remito.dto';
import { Client } from 'src/client/entities/client.entity';

@Injectable()
export class RemitoService {
  constructor(
    @InjectRepository(Remito)
    private readonly remitoRepo: Repository<Remito>,

    @InjectRepository(Client)
    private readonly clientRepo: Repository<Client>,
  ) {}

  async create(dto: CreateRemitoDto) {
    const client = await this.clientRepo.findOne({
      where: { id: dto.clientId },
    });

    if (!client) {
      throw new NotFoundException('Cliente no encontrado');
    }

    const remito = this.remitoRepo.create({
      type: dto.type,
      saleId: dto.saleId,
      paymentId: dto.paymentId,
      client,
      snapshot: dto.snapshot,
    });

    return this.remitoRepo.save(remito);
  }

  async findOne(id: string) {
    const remito = await this.remitoRepo.findOne({
      where: { id },
      relations: ['client'],
    });

    if (!remito) {
      throw new NotFoundException('Remito no encontrado');
    }

    return remito;
  }

  async findByClient(clientId: string) {
    return this.remitoRepo.find({
      where: { client: { id: clientId } },
      order: { createdAt: 'DESC' },
      relations: ['client'],
    });
  }
}
