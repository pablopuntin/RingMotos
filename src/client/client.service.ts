// src/clients/clients.service.ts
import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientsRepo: Repository<Client>,
  ) {}

  async getFinalConsumer(): Promise<Client> {
    const client = await this.clientsRepo.findOne({
      where: { isFinalConsumer: true },
    });

    if (!client) {
      throw new Error('Consumidor Final no existe');
    }

    return client;
  }

  async create(dto: CreateClientDto): Promise<Client> {
    const client = this.clientsRepo.create({
      ...dto,
      isFinalConsumer: false,
      totalDebtCache: 0,
    });

    return this.clientsRepo.save(client);
  }

  async findAll(): Promise<Client[]> {
    return this.clientsRepo.find({
      where: { isFinalConsumer: false },
      order: { lastName: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Client> {
    const client = await this.clientsRepo.findOne({ where: { id } });
    if (!client) throw new NotFoundException('Cliente no encontrado');
    return client;
  }

  async update(id: string, dto: UpdateClientDto): Promise<Client> {
    const client = await this.findOne(id);

    if (client.isFinalConsumer) {
      throw new BadRequestException(
        'Consumidor Final no puede modificarse',
      );
    }

    Object.assign(client, dto);
    return this.clientsRepo.save(client);
  }

  async remove(id: string): Promise<void> {
    const client = await this.findOne(id);

    if (client.isFinalConsumer) {
      throw new BadRequestException(
        'Consumidor Final no puede eliminarse',
      );
    }

    await this.clientsRepo.remove(client);
  }

  async search(term: string): Promise<Client[]> {
    return this.clientsRepo.find({
      where: [
        { name: ILike(`%${term}%`) },
        { lastName: ILike(`%${term}%`) },
        { dni: ILike(`%${term}%`) },
      ],
      order: { lastName: 'ASC' },
    });
  }
}
