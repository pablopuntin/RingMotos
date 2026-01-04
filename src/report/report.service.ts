// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository, Between } from 'typeorm';
// import { CashMovement } from 'src/cash-movement/entities/cash-movement.entity';
// import { Sale } from 'src/sale/entities/sale.entity';
// import { SalesReportQueryDto } from './dto/sales-report.dto';
// import { resolveDateRange, roundMoney } from 'src/common/utils/date-money.utils';
// import { MoneyUtils } from 'src/common/utils/money.utils';
// import { parseLocalDate } from 'src/common/utils/date-money.utils';

// @Injectable()
// export class ReportsService {
//   constructor(
//     @InjectRepository(CashMovement)
//     private readonly cashMovementRepo: Repository<CashMovement>,

//     @InjectRepository(Sale)
//     private readonly saleRepo: Repository<Sale>,
//   ) {}

//     /* =========================
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

//   // async getSalesReport(query: SalesReportQueryDto) {
//   //   const from = query.from
//   //     ? this.parseLocalDate(query.from)
//   //     : undefined;

//   //   const to = query.to
//   //     ? this.parseLocalDate(query.to, true)
//   //     : undefined;

//   //   const sales = await this.saleRepo.find({
//   //     where: from && to ? { createdAt: Between(from, to) } : {},
//   //   });

//   //   const totalAmount = MoneyUtils.sum(
//   //     sales.map(s => s.totalAmount),
//   //   );

//   //   const paidAmount = MoneyUtils.sum(
//   //     sales.map(s => s.paidAmount),
//   //   );

//   //   return {
//   //     totalSales: sales.length,
//   //     totalAmount,
//   //     paidAmount,
//   //     pendingAmount: MoneyUtils.round(
//   //       totalAmount - paidAmount,
//   //     ),
//   //   };
//   // }

//   //ref con  util/date-money
//   async getSalesReport(query: SalesReportQueryDto) {
//   const { from, to } = resolveDateRange(query.from, query.to);

//   const sales = await this.saleRepo.find({
//     where: {
//       createdAt: Between(from, to),
//     },
//   });

//   const totalAmount = roundMoney(
//     sales.reduce((sum, s) => sum + Number(s.totalAmount), 0),
//   );

//   const paidAmount = roundMoney(
//     sales.reduce((sum, s) => sum + Number(s.paidAmount), 0),
//   );

//   return {
//     totalSales: sales.length,
//     totalAmount,
//     paidAmount,
//     pendingAmount: roundMoney(totalAmount - paidAmount),
//   };
// }


// }


import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { CashMovement } from 'src/cash-movement/entities/cash-movement.entity';
import { Sale } from 'src/sale/entities/sale.entity';
import { SalesReportQueryDto } from './dto/sales-report.dto';
import { roundMoney } from 'src/common/utils/date-money.utils';
import { MoneyUtils } from 'src/common/utils/money.utils';
import { resolveDateRange, parseLocalDate } from 'src/common/utils/date-money.utils';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(CashMovement)
    private readonly cashMovementRepo: Repository<CashMovement>,

    @InjectRepository(Sale)
    private readonly saleRepo: Repository<Sale>,
  ) {}

  /* =========================
     CAJA DIARIA
  ========================== */

  async getDailyCashReport(date: string) {
    const start = parseLocalDate(date);
    const end = parseLocalDate(date, true);

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
    const { from, to } = resolveDateRange(query.from, query.to);

    const sales = await this.saleRepo.find({
      where: { createdAt: Between(from, to) },
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
      pendingAmount: MoneyUtils.round(totalAmount - paidAmount),
    };
  }

//   async getSalesByClient(
//   clientId: string,
//   from: Date,
//   to: Date,
// ) {
//   const sales = await this.saleRepo.find({
//     where: {
//       client: { id: clientId },
//       createdAt: Between(from, to),
//     },
//     relations: ['client'],
//   });

//   if (sales.length === 0) {
//     return {
//       clientId,
//       clientName: null,
//       totalSales: 0,
//       totalAmount: 0,
//       paidAmount: 0,
//       pendingAmount: 0,
//     };
//   }

//   const client = sales[0].client;

//   const totalAmount = roundMoney(
//     sales.reduce((sum, s) => sum + Number(s.totalAmount), 0),
//   );

//   const paidAmount = roundMoney(
//     sales.reduce((sum, s) => sum + Number(s.paidAmount), 0),
//   );

//   return {
//     clientId: client.id,
//     clientName: `${client.name} ${client.lastName ?? ''}`.trim(),
//     totalSales: sales.length,
//     totalAmount,
//     paidAmount,
//     pendingAmount: roundMoney(totalAmount - paidAmount),
//   };
// }


// async getSalesByUser(from: Date, to: Date) {
//   const sales = await this.saleRepo.find({
//     where: { createdAt: Between(from, to) },
//   });

//   const map = new Map<string, any>();

//   for (const sale of sales) {
//     const key = sale.receivedBy ?? 'SIN_USUARIO';

//     if (!map.has(key)) {
//       map.set(key, {
//         user: key,
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

//ref
async getSalesByClient(
  from: Date,
  to: Date,
  clientId?: string,
) {
  const sales = await this.saleRepo.find({
    where: {
      createdAt: Between(from, to),
      ...(clientId ? { client: { id: clientId } } : {}),
    },
    relations: ['client'],
  });

  const map = new Map<string, any>();

  for (const sale of sales) {
    const id = sale.client.id;

    if (!map.has(id)) {
      map.set(id, {
        clientId: id,
        clientName: `${sale.client.name} ${sale.client.lastName ?? ''}`,
        totalSales: 0,
        totalAmount: 0,
        paidAmount: 0,
      });
    }

    const row = map.get(id);
    row.totalSales++;
    row.totalAmount += Number(sale.totalAmount);
    row.paidAmount += Number(sale.paidAmount);
  }

  return Array.from(map.values()).map(r => ({
    ...r,
    totalAmount: roundMoney(r.totalAmount),
    paidAmount: roundMoney(r.paidAmount),
    pendingAmount: roundMoney(r.totalAmount - r.paidAmount),
  }));
}


async getSalesByUser(from: Date, to: Date) {
  const sales = await this.saleRepo.find({
    where: { createdAt: Between(from, to) },
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
        paidAmount: 0,
      });
    }

    const row = map.get(key);
    row.totalSales++;
    row.totalAmount += Number(sale.totalAmount);
    row.paidAmount += Number(sale.paidAmount);
  }

  return Array.from(map.values()).map(r => ({
    ...r,
    totalAmount: roundMoney(r.totalAmount),
    paidAmount: roundMoney(r.paidAmount),
    pendingAmount: roundMoney(r.totalAmount - r.paidAmount),
  }));
}



}
