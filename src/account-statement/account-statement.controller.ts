import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AccountStatementService } from './account-statement.service';

@ApiTags('Account Statement')
@Controller('account-statement')
export class AccountStatementController {
  constructor(
    private readonly accountStatementService: AccountStatementService,
  ) {}

  @Get(':clientId')
  @ApiOperation({
    summary: 'Obtener detalle del estado de cuenta del cliente',
  })
  @ApiParam({
    name: 'clientId',
    description: 'ID del cliente',
  })
  @ApiQuery({
    name: 'desde',
    required: false,
    description: 'Fecha desde (YYYY-MM-DD)',
  })
  @ApiQuery({
    name: 'hasta',
    required: false,
    description: 'Fecha hasta (YYYY-MM-DD)',
  })
  async getStatement(
    @Param('clientId') clientId: string,
    @Query('desde') desde?: string,
    @Query('hasta') hasta?: string,
  ) {
    return this.accountStatementService.getStatement(
      clientId,
      'userId',
      desde,
      hasta,
    );
  }

  //controller para proveedores
 @Get('supplier/:supplierId')
@ApiOperation({ summary: 'Obtener estado de cuenta para proveedor' })
@ApiParam({ name: 'supplierId', description: 'ID del proveedor' })
@ApiQuery({ name: 'desde', required: false, description: 'Fecha desde (YYYY-MM-DD)' })
@ApiQuery({ name: 'hasta', required: false, description: 'Fecha hasta (YYYY-MM-DD)' })
@ApiQuery({ name: 'limit', required: false, description: 'Cantidad máxima de movimientos a devolver' })
async getSupplierStatement(
  @Param('supplierId') supplierId: string,
  @Query('desde') desde?: string,
  @Query('hasta') hasta?: string,
  @Query('limit') limitStr?: string,
) {
  const limit = limitStr ? parseInt(limitStr, 10) : 10;
  return this.accountStatementService.getSupplierStatement(
    supplierId,
    desde,
    hasta,
    limit,
  );
}


}
