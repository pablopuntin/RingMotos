import { PartialType } from '@nestjs/swagger';
import { CreateAccountEntryDto } from './create-acount-entry.dto';

export class UpdateAcountEntryDto extends PartialType(CreateAccountEntryDto) {}
