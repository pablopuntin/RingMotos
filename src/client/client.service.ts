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
import { Sale } from 'src/sale/entities/sale.entity';


@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientsRepo: Repository<Client>,

    @InjectRepository(Sale)
    private readonly saleRepo: Repository<Sale>
    ) {}

  private ensureNotFinalConsumer(client: Client) {
    if (client.isFinalConsumer) {
      throw new BadRequestException('Consumidor Final no puede modificarse');
    }
  }

  async getFinalConsumer(): Promise<Client> {
    const client = await this.clientsRepo.findOne({
      where: { isFinalConsumer: true },
    });
    if (!client) {
      throw new NotFoundException('Consumidor Final no existe');
    }
    return client;
  }

  async create(dto: CreateClientDto): Promise<Client> {
    if (dto.email) {
      const existing = await this.clientsRepo.findOne({
        where: { email: dto.email },
      });
      if (existing) {
        throw new BadRequestException('Email ya existe');
      }
    }

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
    if (!client) {
      throw new NotFoundException('Cliente no encontrado');
    }
    return client;
  }


  //refactor con cloudinary
  async update(id: string, dto: UpdateClientDto & { imgUrl?: string }): Promise<Client> {
  const client = await this.findOne(id);
  this.ensureNotFinalConsumer(client);

  // Merge de campos opcionales
  Object.assign(client, dto);

  // Si viene una nueva imagen, actualizamos el campo
  if (dto.imgUrl) {
    client.imgUrl = dto.imgUrl;
  }

  return this.clientsRepo.save(client);
}


  async remove(id: string): Promise<void> {
    const client = await this.findOne(id);
    this.ensureNotFinalConsumer(client);

    await this.clientsRepo.remove(client);
  }

  async search(term: string): Promise<Client[]> {
    return this.clientsRepo.find({
      where: [
        { name: ILike(`%${term}%`), isFinalConsumer: false },
        { lastName: ILike(`%${term}%`), isFinalConsumer: false },
        { dni: ILike(`%${term}%`), isFinalConsumer: false },
      ],
      order: { lastName: 'ASC' },
    });
  }

  // 👇 Nuevo método para actualizar imagen
  async updateImage(id: string, imgUrl: string): Promise<Client> {
    const client = await this.findOne(id);
    this.ensureNotFinalConsumer(client);

    client.imgUrl = imgUrl;
    return this.clientsRepo.save(client);
  }

  async getClientSales(clientId: string) {
  const client = await this.clientsRepo.findOne({
    where: { id: clientId },
  });

  if (!client) {
    throw new NotFoundException('Cliente no encontrado');
  }

  const sales = await this.saleRepo.find({
    where: { client: { id: clientId } },
    relations: ['items'],
    order: { createdAt: 'DESC' },
  });

  return {
    client: {
      id: client.id,
      name: client.name,
    },
    sales: sales.map(sale => ({
      id: sale.id,
      date: sale.createdAt,
      status: sale.status,
      totalAmount: sale.totalAmount,
      paidAmount: sale.paidAmount,
      balance: sale.totalAmount - sale.paidAmount,
      items: sale.items.map(item => ({
        id: item.id,
        productId: item.productId,
        description: item.description,
        qty: item.qty,
        unitPrice: item.unitPrice,
        lineTotal: item.lineTotal,
      })),
    })),
  };
}

}
