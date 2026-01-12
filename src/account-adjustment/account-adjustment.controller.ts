import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AccountAdjustmentService } from './account-adjustment.service';
import { ApplyInterestDto } from './dto/account-interest.dto';
import { ApplyAdjustmentDto } from './dto/account-adjustment.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';

@ApiTags('Account Adjustments')
@ApiBearerAuth()
@Controller('account-adjustments')
export class AccountAdjustmentController {
  constructor(private readonly service: AccountAdjustmentService) {}

  @Post('interest')
  @ApiOperation({ summary: 'Aplicar interés (porcentaje positivo o negativo) a la cuenta corriente' })
  @ApiResponse({ status: 201, description: 'Interés aplicado correctamente' })
  @ApiResponse({ status: 400, description: 'Cliente no encontrado o datos inválidos' })
  applyInterest(
    @Body() dto: ApplyInterestDto,
    @CurrentUser() user: User,
  ) {
    return this.service.applyInterest(dto, user);
  }

  @Post('adjustment')
  @ApiOperation({ summary: 'Aplicar ajuste (monto fijo positivo o negativo) a la cuenta corriente' })
  @ApiResponse({ status: 201, description: 'Ajuste aplicado correctamente' })
  @ApiResponse({ status: 400, description: 'Cliente no encontrado o datos inválidos' })
  applyAdjustment(
    @Body() dto: ApplyAdjustmentDto,
    @CurrentUser() user: User,
  ) {
    return this.service.applyAdjustment(dto, user);
  }
}
