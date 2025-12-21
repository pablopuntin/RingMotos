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
import { ClientsService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { UseInterceptors } from '@nestjs/common';
import { ImageFileInterceptor } from 'src/common/interceptors/image-file.interceptor';
import { UploadedFile } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@ApiTags('Clients')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService,
    private readonly cloudinaryService: CloudinaryService
  ) 
  {}

  @Get('final-consumer')
  @ApiOperation({
    summary: 'Obtener Consumidor Final',
    description: 'Devuelve el cliente marcado como Consumidor Final. Si no existe, lanza error.',
  })
  @ApiResponse({ status: 200, description: 'Consumidor Final encontrado', type: Client })
  @ApiResponse({ status: 404, description: 'Consumidor Final no existe' })
  getFinalConsumer() {
    return this.clientsService.getFinalConsumer();
  }

  @Post()
  @ApiOperation({
    summary: 'Crear cliente',
    description: 'Crea un nuevo cliente (no Consumidor Final) con deuda inicial en 0.',
  })
  @ApiBody({ type: CreateClientDto })
  @ApiResponse({ status: 201, description: 'Cliente creado exitosamente', type: Client })
  create(@Body() dto: CreateClientDto) {
    return this.clientsService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar clientes',
    description: 'Devuelve todos los clientes (excepto Consumidor Final), ordenados por apellido.',
  })
  @ApiResponse({ status: 200, description: 'Listado de clientes', type: [Client] })
  findAll() {
    return this.clientsService.findAll();
  }

  @Get('search')
  @ApiOperation({
    summary: 'Buscar clientes',
    description: 'Busca clientes por nombre, apellido o DNI usando coincidencia parcial.',
  })
  @ApiQuery({ name: 'q', type: 'string', description: 'Término de búsqueda' })
  @ApiResponse({ status: 200, description: 'Clientes encontrados', type: [Client] })
  search(@Query('q') q: string) {
    return this.clientsService.search(q);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener cliente por ID',
    description: 'Devuelve un cliente específico por su ID.',
  })
  @ApiParam({ name: 'id', type: 'string', description: 'ID del cliente' })
  @ApiResponse({ status: 200, description: 'Cliente encontrado', type: Client })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualizar cliente',
    description: 'Actualiza los datos de un cliente. No se permite modificar Consumidor Final.',
  })
  @ApiParam({ name: 'id', type: 'string', description: 'ID del cliente' })
  @ApiBody({ type: UpdateClientDto })
  @ApiResponse({ status: 200, description: 'Cliente actualizado', type: Client })
  @ApiResponse({ status: 400, description: 'Consumidor Final no puede modificarse' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  update(@Param('id') id: string, @Body() dto: UpdateClientDto) {
    return this.clientsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar cliente',
    description: 'Elimina un cliente por ID. No se permite eliminar Consumidor Final.',
  })
  @ApiParam({ name: 'id', type: 'string', description: 'ID del cliente' })
  @ApiResponse({ status: 200, description: 'Cliente eliminado' })
  @ApiResponse({ status: 400, description: 'Consumidor Final no puede eliminarse' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  remove(@Param('id') id: string) {
    return this.clientsService.remove(id);
  }

  @Post(':id/image')
@UseInterceptors(ImageFileInterceptor())
async uploadClientImage(
  @Param('id') id: string,
  @UploadedFile() file: Express.Multer.File,
) {
  if (!file) {
    throw new BadRequestException('No se envió ninguna imagen');
  }

  const imageUrl = await this.cloudinaryService.uploadImage(
    file,
    `client-${id}`,
  );

  return this.clientsService.updateImage(id, imageUrl);
}
}
