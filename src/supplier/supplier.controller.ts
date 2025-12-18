// src/supplier/supplier.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { SupplierService } from './supplier.service';
import { Supplier } from './entities/supplier.entity';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@ApiTags('Suppliers')
@Controller('suppliers')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear proveedor',
    description: 'Crea un nuevo proveedor con deuda inicial en 0.',
  })
  @ApiBody({ type: CreateSupplierDto })
  @ApiResponse({ status: 201, description: 'Proveedor creado exitosamente', type: Supplier })
  @ApiResponse({ status: 400, description: 'Proveedor con CUIT o email ya existe' })
  create(@Body() dto: CreateSupplierDto) {
    return this.supplierService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar proveedores',
    description: 'Devuelve todos los proveedores ordenados por nombre.',
  })
  @ApiResponse({ status: 200, description: 'Listado de proveedores', type: [Supplier] })
  findAll() {
    return this.supplierService.findAll();
  }

  @Get('search')
  @ApiOperation({
    summary: 'Buscar proveedores',
    description: 'Busca proveedores por nombre, CUIT o email.',
  })
  @ApiQuery({ name: 'q', type: 'string', description: 'Término de búsqueda' })
  @ApiResponse({ status: 200, description: 'Proveedores encontrados', type: [Supplier] })
  search(@Query('q') q: string) {
    return this.supplierService.search(q);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener proveedor por ID',
    description: 'Devuelve un proveedor específico por su ID, incluyendo relaciones.',
  })
  @ApiParam({ name: 'id', type: 'string', description: 'ID del proveedor' })
  @ApiResponse({ status: 200, description: 'Proveedor encontrado', type: Supplier })
  @ApiResponse({ status: 404, description: 'Proveedor no encontrado' })
  findOne(@Param('id') id: string) {
    return this.supplierService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualizar proveedor',
    description: 'Actualiza los datos de un proveedor existente.',
  })
  @ApiParam({ name: 'id', type: 'string', description: 'ID del proveedor' })
  @ApiBody({ type: UpdateSupplierDto })
  @ApiResponse({ status: 200, description: 'Proveedor actualizado', type: Supplier })
  @ApiResponse({ status: 404, description: 'Proveedor no encontrado' })
  update(@Param('id') id: string, @Body() dto: UpdateSupplierDto) {
    return this.supplierService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar proveedor',
    description: 'Elimina un proveedor por ID.',
  })
  @ApiParam({ name: 'id', type: 'string', description: 'ID del proveedor' })
  @ApiResponse({ status: 200, description: 'Proveedor eliminado' })
  @ApiResponse({ status: 404, description: 'Proveedor no encontrado' })
  remove(@Param('id') id: string) {
    return this.supplierService.remove(id);
  }
}
