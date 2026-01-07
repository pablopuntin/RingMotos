import { PartialType } from '@nestjs/swagger';
import { CreateAccountStatementDto } from './create-account-statement.dto';

export class UpdateAccountStatementDto extends PartialType(CreateAccountStatementDto) {}
