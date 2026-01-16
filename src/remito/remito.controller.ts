// import { Controller, Post, Body, Param } from '@nestjs/common';
// import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
// import { RemitosService } from './remito.service';
// import { Remito } from './entities/remito.entity';

// @ApiTags('Remitos')
// @Controller('remitos')
// export class RemitosController {
//   constructor(private readonly service: RemitosService) {}

//   @Post()
//   @ApiOperation({
//     summary: 'Crear un remito para una venta',
//     description: 'Genera un remito asociado a una venta. Si no se especifica número, se autogenera. El estado inicial es PENDING.'
//   })
//   @ApiBody({
//     schema: {
//       type: 'object',
//       properties: {
//         saleId: { type: 'string', description: 'ID de la venta asociada' },
//         remitoNumber: { type: 'string', description: 'Número de remito (opcional)', nullable: true },
//         format: { type: 'string', description: 'Formato del remito (por defecto A4)', nullable: true }
//       },
//       required: ['saleId']
//     }
//   })
//   @ApiResponse({ status: 201, description: 'Remito creado exitosamente', type: Remito })
//   @ApiResponse({ status: 404, description: 'Venta no encontrada' })
//   create(@Body() dto: { saleId: string; remitoNumber?: string; format?: string }) {
//     return this.service.createForSale(dto.saleId, dto.remitoNumber, dto.format);
//   }

//   @Post(':id/printed')
//   @ApiOperation({
//     summary: 'Marcar un remito como impreso',
//     description: 'Actualiza el estado de un remito a PRINTED y registra la fecha de impresión.'
//   })
//   @ApiParam({ name: 'id', type: 'string', description: 'ID del remito a marcar como impreso' })
//   @ApiResponse({ status: 200, description: 'Remito marcado como impreso', type: Remito })
//   @ApiResponse({ status: 404, description: 'Remito no encontrado' })
//   markPrinted(@Param('id') id: string) {
//     return this.service.markPrinted(id);
//   }
// }


//ref
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { RemitoService } from './remito.service';
import { CreateRemitoDto } from './dto/create-remito.dto';

@Controller('remitos')
export class RemitoController {
  constructor(private readonly remitoService: RemitoService) {}

  @Post()
  create(@Body() dto: CreateRemitoDto) {
    return this.remitoService.create(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.remitoService.findOne(id);
  }

  @Get('client/:clientId')
  findByClient(@Param('clientId') clientId: string) {
    return this.remitoService.findByClient(clientId);
  }
}
