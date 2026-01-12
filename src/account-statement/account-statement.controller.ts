// src/account-statement/account-statement.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { AccountStatementService } from './account-statement.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';


@ApiTags('Account Statement')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('admin', 'superadmin')
@Controller('account-statement')
export class AccountStatementController {
  constructor(
    private readonly accountStatementService: AccountStatementService,
  ) {}

  @Get(':clientId')
   async getStatement(
    @Param('clientId') clientId: string,
    @CurrentUser() user: { id: string; role: string },
  ) {
    return this.accountStatementService.getStatement(
      clientId,
      user.id,
    );
  }
}
