

// import {
//   BadRequestException,
//   Injectable,
//   NotFoundException
// } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository, ILike } from 'typeorm';
// import { Client } from './entities/client.entity';
// import { CreateClientDto } from './dto/create-client.dto';
// import { UpdateClientDto } from './dto/update-client.dto';
// @Injectable()
// export class ClientsService {
//   constructor(
//     @InjectRepository(Client)
//     private readonly clientsRepo: Repository<Client>,
//   ) {}

//   // ========================
//   // Helpers privados
//   // ========================
//   private ensureNotFinalConsumer(client: Client) {
//     if (client.isFinalConsumer) {
//       throw new BadRequestException(
//         'Consumidor Final no puede modificarse',
//       );
//     }
//   }

//   // ========================
//   // Public API
//   // ========================
//   async getFinalConsumer(): Promise<Client> {
//     const client = await this.clientsRepo.findOne({
//       where: { isFinalConsumer: true },
//     });

//     if (!client) {
//       throw new NotFoundException('Consumidor Final no existe');
//     }

//     return client;
//   }

//   async create(dto: CreateClientDto): Promise<Client> {
//     if (dto.email) {
//       const existing = await this.clientsRepo.findOne({
//         where: { email: dto.email },
//       });
//       if (existing) {
//         throw new BadRequestException('Email ya existe');
//       }
//     }

//     const client = this.clientsRepo.create({
//       ...dto,
//       isFinalConsumer: false,
//       totalDebtCache: 0,
//     });

//     return this.clientsRepo.save(client);
//   }

//   async findAll(): Promise<Client[]> {
//     return this.clientsRepo.find({
//       where: { isFinalConsumer: false },
//       order: { lastName: 'ASC' },
//     });
//   }

//   async findOne(id: string): Promise<Client> {
//     const client = await this.clientsRepo.findOne({ where: { id } });
//     if (!client) {
//       throw new NotFoundException('Cliente no encontrado');
//     }
//     return client;
//   }

//   async update(id: string, dto: UpdateClientDto): Promise<Client> {
//     const client = await this.findOne(id);
//     this.ensureNotFinalConsumer(client);

//     Object.assign(client, dto);
//     return this.clientsRepo.save(client);
//   }

//   async remove(id: string): Promise<void> {
//     const client = await this.findOne(id);
//     this.ensureNotFinalConsumer(client);

//     await this.clientsRepo.remove(client);
//   }

//   async search(term: string): Promise<Client[]> {
//     return this.clientsRepo.find({
//       where: [
//         { name: ILike(`%${term}%`), isFinalConsumer: false },
//         { lastName: ILike(`%${term}%`), isFinalConsumer: false },
//         { dni: ILike(`%${term}%`), isFinalConsumer: false },
//       ],
//       order: { lastName: 'ASC' },
//     });
//   }
  

// }

//refactor
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

  async update(id: string, dto: UpdateClientDto): Promise<Client> {
    const client = await this.findOne(id);
    this.ensureNotFinalConsumer(client);

    Object.assign(client, dto);
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
}
