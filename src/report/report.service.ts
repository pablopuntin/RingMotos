import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { CashMovement } from 'src/cash-movement/entities/cash-movement.entity';
import { Sale } from 'src/sale/entities/sale.entity';
import { SalesReportQueryDto } from './dto/sales-report.dto';
import { MoneyUtils } from 'src/common/utils/money.utils';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(CashMovement)
    private readonly cashMovementRepo: Repository<CashMovement>,

    @InjectRepository(Sale)
    private readonly saleRepo: Repository<Sale>,
  ) {}

  /* =========================
     UTILS
  ========================== */

  private parseLocalDate(date: string, endOfDay = false): Date {
    const [year, month, day] = date.split('-').map(Number);

    return endOfDay
      ? new Date(year, month - 1, day, 23, 59, 59, 999)
      : new Date(year, month - 1, day, 0, 0, 0, 0);
  }

  /* =========================
     CAJA DIARIA
  ========================== */

  async getDailyCashReport(date: string) {
    const start = this.parseLocalDate(date);
    const end = this.parseLocalDate(date, true);

    const movements = await this.cashMovementRepo.find({
      where: { createdAt: Between(start, end) },
    });

    const totalIn = MoneyUtils.sum(
      movements.filter(m => m.type === 'IN').map(m => m.amount),
    );

    const totalOut = MoneyUtils.sum(
      movements.filter(m => m.type === 'OUT').map(m => m.amount),
    );

    return {
      date,
      totalIn,
      totalOut,
      net: MoneyUtils.round(totalIn - totalOut),
    };
  }

  /* =========================
     VENTAS POR RANGO
  ========================== */

  async getSalesReport(query: SalesReportQueryDto) {
    const from = query.from
      ? this.parseLocalDate(query.from)
      : undefined;

    const to = query.to
      ? this.parseLocalDate(query.to, true)
      : undefined;

    const sales = await this.saleRepo.find({
      where: from && to ? { createdAt: Between(from, to) } : {},
    });

    const totalAmount = MoneyUtils.sum(
      sales.map(s => s.totalAmount),
    );

    const paidAmount = MoneyUtils.sum(
      sales.map(s => s.paidAmount),
    );

    return {
      totalSales: sales.length,
      totalAmount,
      paidAmount,
      pendingAmount: MoneyUtils.round(
        totalAmount - paidAmount,
      ),
    };
  }
}
