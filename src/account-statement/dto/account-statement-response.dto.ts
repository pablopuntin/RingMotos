import { ApiProperty } from '@nestjs/swagger';

class StatementItemDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ enum: ['CHARGE', 'PAYMENT', 'ADJUSTMENT'] })
  type: string;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  description: string;

  @ApiProperty()
  debit: string;

  @ApiProperty()
  credit: string;

  @ApiProperty()
  balanceAfter: string;

  @ApiProperty({ required: false })
  sale?: any;

  @ApiProperty({ required: false })
  payment?: any;
}

export class AccountStatementResponseDto {
  @ApiProperty()
  client: {
    id: string;
    name: string;
  };

  @ApiProperty({ type: [StatementItemDto] })
  movements: StatementItemDto[];

  @ApiProperty()
  finalBalance: string;
}
