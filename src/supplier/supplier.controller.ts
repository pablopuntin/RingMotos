// suppliers/suppliers.controller.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from './entities/supplier.entity';
import { CreateSupplierDto } from './dto/create-supplier.dto';

@Controller('suppliers')
export class SuppliersController {
  constructor(@InjectRepository(Supplier) private readonly repo: Repository<Supplier>) {}

  @Get()
  list() { return this.repo.find({ order: { createdAt: 'DESC' } }); }

  @Get(':id')
  get(@Param('id') id: string) { return this.repo.findOneByOrFail({ id }); }

  @Post()
  create(@Body() dto: CreateSupplierDto) {
    const s = this.repo.create(dto);
    return this.repo.save(s);
  }
}
