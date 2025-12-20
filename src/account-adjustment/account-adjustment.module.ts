import { Module } from '@nestjs/common';
import { AccountAdjustmentService } from './account-adjustment.service';
import { AccountAdjustmentController } from './account-adjustment.controller';
import { AccountEntry } from 'src/acount-entry/entities/acount-entry.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'src/client/entities/client.entity';
import { Sale } from 'src/sale/entities/sale.entity';

// @Module({
//   imports: [
//      TypeOrmModule.forFeature([AccountEntry]),],
//   controllers: [AccountAdjustmentController],
//   providers: [AccountAdjustmentService],
// })
// export class AccountAdjustmentModule {}


@Module({
  imports: [
    TypeOrmModule.forFeature([
      AccountEntry,
      Client,
      Sale // opcional si lo referenciás
    ]),
  ],
  controllers: [AccountAdjustmentController],
  providers: [AccountAdjustmentService],
})
export class AccountAdjustmentModule {}
