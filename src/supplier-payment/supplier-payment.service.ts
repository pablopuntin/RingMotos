import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SupplierPayment, SupplierPaymentStatus } from './entities/supplier-payment.entity';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import { CashRegister } from 'src/cash-register/entities/cash-register.entity';
import { CashMovement } from 'src/cash-movement/entities/cash-movement.entity';
import {
  SupplierAccountEntry,
  SupplierAccountEntryType,
} from '../supplier-account-entry/entities/supplier-account-entry.entity';
import { CreateSupplierPaymentDto } from './dto/create-supplier-payment.dto';
import { IsNull } from 'typeorm';
import { RemitoService } from 'src/remito/remito.service';

@Injectable()
export class SupplierPaymentsService {
  constructor(
    private readonly ds: DataSource,

    @InjectRepository(SupplierPayment)
    private readonly spRepo: Repository<SupplierPayment>,

    @InjectRepository(Supplier)
    private readonly supplierRepo: Repository<Supplier>,

    @InjectRepository(CashRegister)
    private readonly cashRepo: Repository<CashRegister>,

    @InjectRepository(CashMovement)
    private readonly cmRepo: Repository<CashMovement>,

    @InjectRepository(SupplierAccountEntry)
    private readonly saeRepo: Repository<SupplierAccountEntry>,

      private readonly remitoService: RemitoService,
  ) {}

 
//   async create(dto: CreateSupplierPaymentDto) {
//   return this.ds.transaction(async manager => {
//     // const supplier = await manager.findOneByOrFail(Supplier, {
//     //   id: dto.supplierId,
//     // });

//     // if (supplier.totalDebtCache <= 0) {
//     //   throw new BadRequestException('El proveedor no tiene deuda');
//     //}

//     //ref
//     const supplier = await manager.findOneByOrFail(Supplier, { id: dto.supplierId });

// const debtBefore = supplier.totalDebtCache; // 👈 snapshot previo

// if (debtBefore <= 0) {
//   throw new BadRequestException('El proveedor no tiene deuda');
// }


//     // 🔹 Buscar caja abierta automáticamente
//     const cashRegister = await manager.findOne(CashRegister, {
//       where: { closedAt: IsNull() },
//     });

//     if (!cashRegister) {
//       throw new BadRequestException('No hay ninguna caja abierta');
//     }

//     // 🔹 Tomamos el menor entre lo que debe y lo que paga
//     const amount = Math.min(dto.amount, supplier.totalDebtCache);

//     // 🔹 Actualizamos deuda del proveedor
//     supplier.totalDebtCache -= amount;
//     await manager.save(supplier);

//     // 🔹 Creamos el pago
//     const payment = manager.create(SupplierPayment, {
//       supplier,
//       cashRegister,
//       amount,
//       paymentMethod: dto.paymentMethod,
//       paymentDate: new Date(),
//       status: SupplierPaymentStatus.COMPLETED,
//     });

//     await manager.save(payment);

//     // 🔹 Asiento contable del proveedor (cuenta corriente)
//     await manager.save(
//       manager.create(SupplierAccountEntry, {
//         supplier,
//         supplierPayment: payment,
//         type: SupplierAccountEntryType.PAYMENT,
//         amount,
//         balanceAfter: supplier.totalDebtCache,
//         description: `Pago a proveedor ${supplier.name}`,
//       }),
//     );

//     // 🔹 MOVIMIENTO DE CAJA (OUT = egreso)
//     await manager.save(
//       manager.create(CashMovement, {
//         cashRegister,
//         type: 'OUT',
//         amount,
//         reason: `Pago a proveedor ${supplier.name}`,
//         relatedSupplierPayment: payment,
//       }),
//     );

//     return {
//   payment,
//   summary: {
//     pagoRealizado: amount,
//     deudaAnterior: debtBefore,
//     deudaActual: supplier.totalDebtCache,
//   },
// };
//   });   
// } 

//ref
async create(dto: CreateSupplierPaymentDto) {
  return this.ds.transaction(async manager => {
    const supplier = await manager.findOneByOrFail(Supplier, {
      id: dto.supplierId,
    });

    const debtBefore = Number(supplier.totalDebtCache);

    if (debtBefore <= 0) {
      throw new BadRequestException('El proveedor no tiene deuda');
    }

    // 🔹 Buscar caja abierta
    const cashRegister = await manager.findOne(CashRegister, {
      where: { closedAt: IsNull() },
    });

    if (!cashRegister) {
      throw new BadRequestException('No hay ninguna caja abierta');
    }

    // 🔹 Tomamos el menor entre lo que debe y lo que paga
    const amount = Math.min(dto.amount, debtBefore);

    // 🔹 Actualizamos deuda del proveedor
    supplier.totalDebtCache = debtBefore - amount;
    await manager.save(supplier);

    // 🔹 Creamos el pago
    const payment = manager.create(SupplierPayment, {
      supplier,
      cashRegister,
      amount,
      paymentMethod: dto.paymentMethod,
      paymentDate: new Date(),
      status: SupplierPaymentStatus.COMPLETED,
    });

    await manager.save(payment);

    // 🔹 Asiento contable del proveedor (cuenta corriente)
    await manager.save(
      manager.create(SupplierAccountEntry, {
        supplier,
        supplierPayment: payment,
        type: SupplierAccountEntryType.PAYMENT,
        amount,
        balanceAfter: supplier.totalDebtCache,
        description: `Pago a proveedor ${supplier.name}`,
      }),
    );

    // 🔹 Movimiento de caja (OUT = egreso)
    await manager.save(
      manager.create(CashMovement, {
        cashRegister,
        type: 'OUT',
        amount,
        reason: `Pago a proveedor ${supplier.name}`,
        relatedSupplierPayment: payment,
      }),
    );

    // =========================
    // ✅  NUEVO: GENERAR SNAPSHOT DE PAGO
    // =========================
    const snapshot = {
      id: payment.id,
      type: 'SUPPLIER_PAYMENT',
      date: new Date(),

      payment: {
        id: payment.id,
        amount: amount,
        paymentMethod: dto.paymentMethod,
        paymentDate: payment.paymentDate,
      },

      supplier: {
        id: supplier.id,
        name: supplier.name,
        totalDebtCache: supplier.totalDebtCache.toFixed(2),
      },

      summary: {
        pagoRealizado: amount,
        deudaAnterior: debtBefore,
        deudaActual: supplier.totalDebtCache,
      },

      // 👉 Muy importante para tu query:
      _supplierId: supplier.id,
    };

    // =========================
    // ✅ GUARDAR REMITO DEL PAGO
    // =========================
    await this.remitoService.create({
      type: 'SUPPLIER_PAYMENT',
      supplierId: supplier.id,
      snapshot,
    });

    // =========================
    // RESPUESTA FINAL
    // =========================
    return {
      payment,
      summary: {
        pagoRealizado: amount,
        deudaAnterior: debtBefore,
        deudaActual: supplier.totalDebtCache,
      },
    };
  });
}


 
  async reverse(paymentId: string) {
    return this.ds.transaction(async manager => {
      const payment = await manager.findOne(SupplierPayment, {
        where: { id: paymentId },
        relations: { supplier: true, cashRegister: true },
      });

      if (!payment) {
        throw new NotFoundException('Pago no encontrado');
      }

      if (payment.status !== SupplierPaymentStatus.COMPLETED) {
        throw new BadRequestException(
          'Solo se pueden revertir pagos COMPLETED',
        );
      }

      // 1️⃣ Cambiar estado del pago
      payment.status = SupplierPaymentStatus.REVERSED;
      await manager.save(payment);

      // 2️⃣ Revertir deuda del proveedor
      const supplier = payment.supplier;
      supplier.totalDebtCache = Number(supplier.totalDebtCache) + Number(payment.amount);
      await manager.save(supplier);

      // 3️⃣ Asiento contable de reversión
      const reversalEntry = manager.create(SupplierAccountEntry, {
        supplier,
        supplierPayment: payment,
        type: SupplierAccountEntryType.ADJUSTMENT,
        amount: payment.amount,
        balanceAfter: supplier.totalDebtCache,
        description: `Reversión pago proveedor ${supplier.name}`,
      });

      await manager.save(reversalEntry);

      // 4️⃣ Movimiento de caja (IN)
      const cashMovement = manager.create(CashMovement, {
        cashRegister: payment.cashRegister,
        type: 'IN',
        amount: payment.amount,
        reason: `Reversión pago proveedor ${supplier.name}`,
        relatedSupplierPayment: payment,
      });

      await manager.save(cashMovement);

      return payment;
    });
  }
}
