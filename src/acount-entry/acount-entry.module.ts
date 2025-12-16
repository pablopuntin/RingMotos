import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntry } from './entities/acount-entry.entity';
import { AccountEntryService } from './acount-entry.service';
import { AccountEntryController } from './acount-entry.controller';
import { Client } from 'src/client/entities/client.entity';
import { Sale } from 'src/sale/entities/sale.entity';
import { Payment } from 'src/payment/entities/payment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AccountEntry,
      Client,
      Sale,
      Payment,
    ]),
  ],
  controllers: [AccountEntryController],
  providers: [AccountEntryService],
  exports: [AccountEntryService],
})
export class AccountEntryModule {}
