import { Controller, Body } from "@nestjs/common";
import { Post } from "@nestjs/common";
import { AccountAdjustmentService } from "./account-adjustment.service";
import { ApplyInterestDto } from './dto/account-adjustment.dto';



@Controller('account-adjustments')
export class AccountAdjustmentController {
  constructor(
    private readonly service: AccountAdjustmentService,
  ) {}

  @Post('interest')
  applyInterest(@Body() dto: ApplyInterestDto) {
    return this.service.applyInterest(dto);
  }

  @Post('adjustment')
  applyAdjustment(@Body() dto: ApplyInterestDto) {
    return this.service.applyAdjustment(dto);
  }
}
