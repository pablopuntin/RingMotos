import { Controller, Body, Post } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AccountAdjustmentService } from "./account-adjustment.service";
import { ApplyInterestDto } from './dto/account-adjustment.dto';

@ApiTags('Account Adjustments') // Agrupa los endpoints en Swagger
@Controller('account-adjustments')
export class AccountAdjustmentController {
  constructor(
    private readonly service: AccountAdjustmentService,
  ) {}

  @Post('interest')
  @ApiOperation({ summary: 'Aplicar interés a la cuenta corriente' })
  @ApiResponse({ status: 201, description: 'Interés aplicado correctamente' })
  @ApiResponse({ status: 400, description: 'Cliente no encontrado o datos inválidos' })
  applyInterest(@Body() dto: ApplyInterestDto) {
    return this.service.applyInterest(dto);
  }

  @Post('adjustment')
  @ApiOperation({ summary: 'Aplicar ajuste a la cuenta corriente' })
  @ApiResponse({ status: 201, description: 'Ajuste aplicado correctamente' })
  @ApiResponse({ status: 400, description: 'Cliente no encontrado o datos inválidos' })
  applyAdjustment(@Body() dto: ApplyInterestDto) {
    return this.service.applyAdjustment(dto);
  }
}
