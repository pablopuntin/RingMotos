import { PartialType } from '@nestjs/swagger';
import { CreatePaymentAllocationDto } from './create-payment-allocation.dto';

export class UpdatePaymentAllocationDto extends PartialType(CreatePaymentAllocationDto) {}
