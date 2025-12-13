import { PartialType } from '@nestjs/swagger';
import { CreateAcountEntryDto } from './create-acount-entry.dto';

export class UpdateAcountEntryDto extends PartialType(CreateAcountEntryDto) {}
