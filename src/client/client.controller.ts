import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiConsumes,
} from '@nestjs/swagger';
import { ClientsService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { ImageFileInterceptor } from 'src/common/interceptors/image-file.interceptor';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@ApiTags('Clients')
@Controller('clients')
export class ClientsController {
  constructor(
    private readonly clientsService: ClientsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Get('final-consumer')
  @ApiOperation({
    summary: 'Obtener Consumidor Final',
    description: 'Devuelve el cliente marcado como Consumidor Final. Este cliente no puede modificarse ni eliminarse.',
  })
  @ApiResponse({ status: 200, type: Client })
  @ApiResponse({ status: 404, description: 'Consumidor Final no existe' })
  getFinalConsumer() {
    return this.clientsService.getFinalConsumer();
  }

  @Post()
  @UseInterceptors(ImageFileInterceptor())
  @ApiOperation({
    summary: 'Crear cliente con foto opcional',
    description: 'Permite registrar un nuevo cliente. Si se adjunta una imagen, se sube automáticamente a Cloudinary.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Juan' },
        lastName: { type: 'string', example: 'Pérez' },
        email: { type: 'string', example: 'juan.perez@mail.com' },
        dni: { type: 'string', example: '12345678' },
        file: {
          type: 'string',
          format: 'binary',
          description: 'Foto opcional del cliente (JPG/PNG)',
        },
      },
    },
  })
  @ApiResponse({ status: 201, type: Client })
  async create(
    @Body() dto: CreateClientDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    let imgUrl: string | undefined;
    if (file) {
      imgUrl = await this.cloudinaryService.uploadImage(
        file,
        `client-${dto.email ?? Date.now()}`,
      );
    }
    return this.clientsService.create({ ...dto, imgUrl });
  }

  @Get()
  @ApiOperation({ summary: 'Listar clientes', description: 'Devuelve todos los clientes registrados (excepto Consumidor Final).' })
  @ApiResponse({ status: 200, type: [Client] })
  findAll() {
    return this.clientsService.findAll();
  }

  @Get('search')
  @ApiOperation({ summary: 'Buscar clientes', description: 'Permite buscar clientes por nombre, apellido o DNI.' })
  @ApiQuery({ name: 'q', type: 'string', example: 'Pérez' })
  @ApiResponse({ status: 200, type: [Client] })
  search(@Query('q') q: string) {
    return this.clientsService.search(q);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener cliente por ID' })
  @ApiParam({ name: 'id', type: 'string', example: 'uuid-cliente' })
  @ApiResponse({ status: 200, type: Client })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(ImageFileInterceptor())
  @ApiOperation({
    summary: 'Actualizar cliente con foto opcional',
    description: 'Permite actualizar datos de un cliente. Si se adjunta una nueva imagen, reemplaza la anterior en Cloudinary.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Juan' },
        lastName: { type: 'string', example: 'Pérez' },
        email: { type: 'string', example: 'juan.perez@mail.com' },
        dni: { type: 'string', example: '12345678' },
        phone: { type: 'string', example: '+54 3857 123456' },
        address: { type: 'string', example: 'Av. Siempre Viva 123' },
        file: {
          type: 'string',
          format: 'binary',
          description: 'Foto opcional del cliente (JPG/PNG)',
        }
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Cliente actualizado', type: Client })
  @ApiResponse({ status: 400, description: 'Consumidor Final no puede modificarse' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateClientDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    let imgUrl: string | undefined;
    if (file) {
      imgUrl = await this.cloudinaryService.uploadImage(file, `client-${id}`);
    }
    return this.clientsService.update(id, { ...dto, imgUrl });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar cliente' })
  @ApiParam({ name: 'id', type: 'string', example: 'uuid-cliente' })
  @ApiResponse({ status: 200, description: 'Cliente eliminado' })
  @ApiResponse({ status: 400, description: 'Consumidor Final no puede eliminarse' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  remove(@Param('id') id: string) {
    return this.clientsService.remove(id);
  }

  @Post(':id/image')
  @UseInterceptors(ImageFileInterceptor())
  @ApiOperation({
    summary: 'Subir/actualizar imagen del cliente',
    description: 'Permite subir o reemplazar la imagen de un cliente en Cloudinary.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Imagen JPG/PNG del cliente',
        }
      }
    }

  })
  @ApiResponse({ status: 200, description: 'Imagen actualizada correctamente', type: Client })
  @ApiResponse({ status: 400, description: 'No se envió ninguna imagen o Consumidor Final no puede modificarse' })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  async uploadClientImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('No se envió ninguna imagen');
    const imgUrl = await this.cloudinaryService.uploadImage(file, `client-${id}`);
    return this.clientsService.updateImage(id, imgUrl);
  }

  @Get(':clientId/sales')
@ApiOperation({ summary: 'Ventas de un cliente con detalle de ítems' })
findClientSales(@Param('clientId') clientId: string) {
  return this.clientsService.getClientSales(clientId);
}

}
