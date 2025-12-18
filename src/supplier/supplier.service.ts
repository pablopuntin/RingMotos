// src/supplier/supplier.service.ts
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supplier } from './entities/supplier.entity';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { ILike } from 'typeorm';

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(Supplier)
    private readonly supplierRepo: Repository<Supplier>,
  ) {}

  async create(dto: CreateSupplierDto): Promise<Supplier> {
    // Validar CUIT único
    const existingCuit = await this.supplierRepo.findOne({
      where: { cuit: dto.cuit },
    });
    if (existingCuit) {
      throw new BadRequestException('Ya existe un proveedor con ese CUIT');
    }

    // Validar email único
    const existingEmail = await this.supplierRepo.findOne({
      where: { email: dto.email },
    });
    if (existingEmail) {
      throw new BadRequestException('Ya existe un proveedor con ese email');
    }

    const supplier = this.supplierRepo.create({
      ...dto,
      totalDebtCache: 0,
    });
    return this.supplierRepo.save(supplier);
  }

  async update(id: string, dto: UpdateSupplierDto): Promise<Supplier> {
    const supplier = await this.findOne(id);

    // Validar CUIT único si se cambia
    if (dto.cuit && dto.cuit !== supplier.cuit) {
      const existingCuit = await this.supplierRepo.findOne({
        where: { cuit: dto.cuit },
      });
      if (existingCuit) {
        throw new BadRequestException('Ya existe otro proveedor con ese CUIT');
      }
    }

    // Validar email único si se cambia
    if (dto.email && dto.email !== supplier.email) {
      const existingEmail = await this.supplierRepo.findOne({
        where: { email: dto.email },
      });
      if (existingEmail) {
        throw new BadRequestException('Ya existe otro proveedor con ese email');
      }
    }

    Object.assign(supplier, dto);
    return this.supplierRepo.save(supplier);
  }

  async findOne(id: string): Promise<Supplier> {
    const supplier = await this.supplierRepo.findOne({ where: { id } });
    if (!supplier) throw new NotFoundException('Proveedor no encontrado');
    return supplier;
  }

  async findAll(): Promise<Supplier[]> {
    return this.supplierRepo.find({ order: { name: 'ASC' } });
  }

  async remove(id: string): Promise<void> {
    const supplier = await this.findOne(id);
    await this.supplierRepo.remove(supplier);
  }

  async search(term: string): Promise<Supplier[]> {
  return this.supplierRepo.find({
    where: [
      { name: ILike(`%${term}%`) },
      { cuit: ILike(`%${term}%`) },
      { email: ILike(`%${term}%`) },
    ],
    order: { name: 'ASC' },
  });
}

}
