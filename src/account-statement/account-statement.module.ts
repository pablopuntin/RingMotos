import { Module } from '@nestjs/common';
import { AccountStatementService } from './account-statement.service';
import { AccountStatementController } from './account-statement.controller';
import { Client } from '../client/entities/client.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntry } from 'src/acount-entry/entities/acount-entry.entity';
import { Sale } from 'src/sale/entities/sale.entity';
import { Payment } from 'src/payment/entities/payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client, AccountEntry, Sale, Payment]),],
  controllers: [AccountStatementController],
  providers: [AccountStatementService]
})
export class AccountStatementModule {}
