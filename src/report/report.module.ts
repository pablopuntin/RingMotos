import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReportsController } from './report.controller';
import { ReportsService } from './report.service';

import { CashMovement } from 'src/cash-movement/entities/cash-movement.entity';
import { Sale } from 'src/sale/entities/sale.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CashMovement,
      Sale,
    ]),
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
