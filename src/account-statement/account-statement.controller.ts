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
}
