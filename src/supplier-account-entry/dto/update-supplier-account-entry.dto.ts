import { PartialType } from '@nestjs/swagger';
import { CreateSupplierAccountEntryDto } from './create-supplier-account-entry.dto';

export class UpdateSupplierAccountEntryDto extends PartialType(CreateSupplierAccountEntryDto) {}
