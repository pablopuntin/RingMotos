import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  Patch
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
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UseGuards } from '@nestjs/common';
import { AuthSwagger } from 'src/auth/decorators/auth-swagger.decorator';
@ApiTags('Suppliers')
@AuthSwagger()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('superadmin')
@Controller('suppliers')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('superadmin')
  @Post()
  @ApiOperation({ summary: 'Crear proveedor' })
  @ApiResponse({ status: 201, type: Supplier })
  create(@Body() dto: CreateSupplierDto) {
    return this.supplierService.create(dto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('superadmin')
  @Get()
  @ApiOperation({ summary: 'Listar proveedores' })
  findAll() {
    return this.supplierService.findAll();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('superadmin')
  @Get(':id')
  @ApiOperation({ summary: 'Detalle proveedor' })
  findOne(@Param('id') id: string) {
    return this.supplierService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('superadmin')
  @Put(':id')
  @ApiOperation({ summary: 'Actualizar proveedor' })
  update(@Param('id') id: string, @Body() dto: UpdateSupplierDto) {
    return this.supplierService.update(id, dto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('superadmin')
  @Patch(':id/deactivate')
  @ApiOperation({ summary: 'Desactivar proveedor' })
  deactivate(@Param('id') id: string) {
    return this.supplierService.deactivate(id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('superadmin')
  @Patch(':id/activate')
  @ApiOperation({ summary: 'Reactivar proveedor' })
  activate(@Param('id') id: string) {
    return this.supplierService.activate(id);
  }
}
