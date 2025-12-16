import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AccountEntryService } from './acount-entry.service';
import { CreateAccountEntryDto } from './dto/create-acount-entry.dto';

@ApiTags('Account Entries')
@Controller('account-entries')
export class AccountEntryController {
  constructor(private readonly service: AccountEntryService) {}

  @Post()
  @ApiOperation({ summary: 'Crear movimiento de cuenta corriente' })
  create(@Body() dto: CreateAccountEntryDto) {
    return this.service.create(dto);
  }

  @Get('client/:clientId')
  @ApiOperation({ summary: 'Cuenta corriente del cliente' })
  findByClient(@Param('clientId') clientId: string) {
    return this.service.findByClient(clientId);
  }
}
