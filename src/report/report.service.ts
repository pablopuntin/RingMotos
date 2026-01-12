// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository, Between } from 'typeorm';
// import { CashMovement } from 'src/cash-movement/entities/cash-movement.entity';
// import { Sale } from 'src/sale/entities/sale.entity';
// import { SalesReportQueryDto } from './dto/sales-report.dto';
// import { roundMoney } from 'src/common/utils/date-money.utils';
// import { MoneyUtils } from 'src/common/utils/money.utils';
// import { resolveDateRange, parseLocalDate } from 'src/common/utils/date-money.utils';

// @Injectable()
// export class ReportsService {
//   constructor(
//     @InjectRepository(CashMovement)
//     private readonly cashMovementRepo: Repository<CashMovement>,

//     @InjectRepository(Sale)
//     private readonly saleRepo: Repository<Sale>,
//   ) {}

//   /* =========================
//      CAJA DIARIA
//   ========================== */

//   async getDailyCashReport(date: string) {
//     const start = parseLocalDate(date);
//     const end = parseLocalDate(date, true);

//     const movements = await this.cashMovementRepo.find({
//       where: { createdAt: Between(start, end) },
//     });

//     const totalIn = MoneyUtils.sum(
//       movements.filter(m => m.type === 'IN').map(m => m.amount),
//     );

//     const totalOut = MoneyUtils.sum(
//       movements.filter(m => m.type === 'OUT').map(m => m.amount),
//     );

//     return {
//       date,
//       totalIn,
//       totalOut,
//       net: MoneyUtils.round(totalIn - totalOut),
//     };
//   }

//   /* =========================
//      VENTAS POR RANGO
//   ========================== */

//   async getSalesReport(query: SalesReportQueryDto) {
//     const { from, to } = resolveDateRange(query.from, query.to);

//     const sales = await this.saleRepo.find({
//       where: { createdAt: Between(from, to) },
//     });

//     const totalAmount = MoneyUtils.sum(
//       sales.map(s => s.totalAmount),
//     );

//     const paidAmount = MoneyUtils.sum(
//       sales.map(s => s.paidAmount),
//     );

//     return {
//       totalSales: sales.length,
//       totalAmount,
//       paidAmount,
//       pendingAmount: MoneyUtils.round(totalAmount - paidAmount),
//     };
//   }


// async getSalesByUser(
//   from: Date,
//   to: Date,
//   userId?: string,
// ) {
//   const sales = await this.saleRepo.find({
//     where: {
//       createdAt: Between(from, to),
//       ...(userId ? { soldBy: { id: userId } } : {}),
//     },
//     relations: ['soldBy'],
//   });

//   const map = new Map<string, any>();

//   for (const sale of sales) {
//     const user = sale.soldBy;
//     const key = user.id;

//     if (!map.has(key)) {
//       map.set(key, {
//         userId: user.id,
//         userName: `${user.firstname} ${user.lastname}`,
//         totalSales: 0,
//         totalAmount: 0,
//         paidAmount: 0,
//       });
//     }

//     const row = map.get(key);
//     row.totalSales++;
//     row.totalAmount += Number(sale.totalAmount);
//     row.paidAmount += Number(sale.paidAmount);
//   }

//   return Array.from(map.values()).map(r => ({
//     ...r,
//     totalAmount: roundMoney(r.totalAmount),
//     paidAmount: roundMoney(r.paidAmount),
//     pendingAmount: roundMoney(r.totalAmount - r.paidAmount),
//   }));
// }

// }

//ref
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { CashMovement } from 'src/cash-movement/entities/cash-movement.entity';
import { Sale } from 'src/sale/entities/sale.entity';
import { AccountEntry } from 'src/acount-entry/entities/acount-entry.entity';
import { SalesReportQueryDto } from './dto/sales-report.dto';
import { MoneyUtils } from 'src/common/utils/money.utils';
import { resolveDateRange, parseLocalDate } from 'src/common/utils/date-money.utils';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(CashMovement)
    private readonly cashMovementRepo: Repository<CashMovement>,

    @InjectRepository(Sale)
    private readonly saleRepo: Repository<Sale>,

    @InjectRepository(AccountEntry)
    private readonly accountEntryRepo: Repository<AccountEntry>,
  ) {}

  /* =========================
     CAJA DIARIA (VERDAD REAL)
  ========================== */
  async getDailyCashReport(date: string) {
    const start = parseLocalDate(date);
    const end = parseLocalDate(date, true);

    const movements = await this.cashMovementRepo.find({
      where: { createdAt: Between(start, end) },
    });

    const totalIn = MoneyUtils.sum(
      movements.filter(m => m.type === 'IN').map(m => Number(m.amount)),
    );

    const totalOut = MoneyUtils.sum(
      movements.filter(m => m.type === 'OUT').map(m => Number(m.amount)),
    );

    return {
      date,
      totalIn,
      totalOut,
      net: MoneyUtils.round(totalIn - totalOut),
    };
  }

  /* =========================
     VENTAS (COMERCIAL)
  ========================== */
  async getSalesReport(query: SalesReportQueryDto) {
    const { from, to } = resolveDateRange(query.from, query.to);

    const sales = await this.saleRepo.find({
      where: { createdAt: Between(from, to) },
    });

    const totalAmount = MoneyUtils.sum(
      sales.map(s => Number(s.totalAmount)),
    );

    /* Lo realmente cobrado en el período */
    const cashIn = await this.cashMovementRepo.find({
      where: {
        type: 'IN',
        createdAt: Between(from, to),
      },
    });

    const collected = MoneyUtils.sum(
      cashIn.map(m => Number(m.amount)),
    );

    /* Deuda generada por ventas */
    const charges = await this.accountEntryRepo.find({
      where: {
        type: 'CHARGE',
        createdAt: Between(from, to),
      },
    });

    const totalCharged = MoneyUtils.sum(
      charges.map(e => Number(e.amount)),
    );

    /* Pagos aplicados en el período */
    const payments = await this.accountEntryRepo.find({
      where: {
        type: 'PAYMENT',
        createdAt: Between(from, to),
      },
    });

    const totalPaid = MoneyUtils.sum(
      payments.map(e => Number(e.amount)),
    );

    return {
      totalSales: sales.length,
      totalAmount: MoneyUtils.round(totalAmount), // lo vendido
      chargedToAccount: MoneyUtils.round(totalCharged), // lo que se cargó a CC
      paid: MoneyUtils.round(totalPaid), // lo que realmente se pagó
      collectedInCash: MoneyUtils.round(collected), // lo que entró a caja
      pendingInAccount: MoneyUtils.round(totalCharged - totalPaid), // deuda nueva
    };
  }

  /* =========================
     VENTAS POR USUARIO (REAL)
  ========================== */
  async getSalesByUser(from: Date, to: Date, userId?: string) {
    const sales = await this.saleRepo.find({
      where: {
        createdAt: Between(from, to),
        ...(userId ? { soldBy: { id: userId } } : {}),
      },
      relations: ['soldBy'],
    });

    const map = new Map<string, any>();

    for (const sale of sales) {
      const user = sale.soldBy;
      const key = user.id;

      if (!map.has(key)) {
        map.set(key, {
          userId: user.id,
          userName: `${user.firstname} ${user.lastname}`,
          totalSales: 0,
          totalAmount: 0,
          charged: 0,
          paid: 0,
        });
      }

      const row = map.get(key);
      row.totalSales++;
      row.totalAmount += Number(sale.totalAmount);
    }

    /* Cargos por usuario */
    const charges = await this.accountEntryRepo
      .createQueryBuilder('ae')
      .leftJoin('ae.sale', 'sale')
      .leftJoin('sale.soldBy', 'user')
      .where('ae.type = :type', { type: 'CHARGE' })
      .andWhere('ae.createdAt BETWEEN :from AND :to', { from, to })
      .getMany();

    for (const c of charges) {
      const uid = c.sale?.soldBy?.id;
      if (uid && map.has(uid)) {
        map.get(uid).charged += Number(c.amount);
      }
    }

    /* Pagos */
    const payments = await this.accountEntryRepo.find({
      where: {
        type: 'PAYMENT',
        createdAt: Between(from, to),
      },
      relations: ['sale', 'sale.soldBy'],
    });

    for (const p of payments) {
      const uid = p.sale?.soldBy?.id;
      if (uid && map.has(uid)) {
        map.get(uid).paid += Number(p.amount);
      }
    }

    return Array.from(map.values()).map(r => ({
      userId: r.userId,
      userName: r.userName,
      totalSales: r.totalSales,
      totalAmount: MoneyUtils.round(r.totalAmount),
      chargedToAccount: MoneyUtils.round(r.charged),
      paid: MoneyUtils.round(r.paid),
      pending: MoneyUtils.round(r.charged - r.paid),
    }));
  }
}
