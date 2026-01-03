import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { CashMovement } from 'src/cash-movement/entities/cash-movement.entity';
import { Sale } from 'src/sale/entities/sale.entity';
import { SalesReportQueryDto } from './dto/sales-report.dto';


@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(CashMovement)
    private readonly cashMovementRepo: Repository<CashMovement>,

    @InjectRepository(Sale)
    private readonly saleRepo: Repository<Sale>,
  ) {}

  // ✅ MÉTODO PRIVADO
  private parseLocalDate(date: string, endOfDay = false): Date {
    const [year, month, day] = date.split('-').map(Number);

    return endOfDay
      ? new Date(year, month - 1, day, 23, 59, 59)
      : new Date(year, month - 1, day, 0, 0, 0);
  }

  //metodo de redondeo
  private round(value: number, decimals = 2): number {
  return Number(value.toFixed(decimals));
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

    const totalIn = movements
      .filter(m => m.type === 'IN')
      .reduce((s, m) => s + Number(m.amount), 0);

    const totalOut = movements
      .filter(m => m.type === 'OUT')
      .reduce((s, m) => s + Number(m.amount), 0);

    return {
      date,
      totalIn,
      totalOut,
      net: totalIn - totalOut,
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

    const totalAmountRaw = sales.reduce(
  (sum, s) => sum + Number(s.totalAmount),
  0,
);

const paidAmountRaw = sales.reduce(
  (sum, s) => sum + Number(s.paidAmount),
  0,
);

const totalAmount = this.round(totalAmountRaw);
const paidAmount = this.round(paidAmountRaw);
const pendingAmount = this.round(totalAmount - paidAmount);

return {
  totalSales: sales.length,
  totalAmount,
  paidAmount,
  pendingAmount,
};
  }
}
