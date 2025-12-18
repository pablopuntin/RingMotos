import { SupplierPaymentStatus } from './entities/supplier-payment.entity';
// supplier-payments/supplier-payments.service.ts
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SupplierPayment } from './entities/supplier-payment.entity';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import { CashRegister } from 'src/cash-register/entities/cash-register.entity';
import { CashMovement } from 'src/cash-movement/entities/cash-movement.entity';
import {
  SupplierAccountEntry,
  SupplierAccountEntryType,
} from '../supplier-account-entry/entities/supplier-account-entry.entity';


@Injectable()
export class SupplierPaymentsService {
  constructor(
    private readonly ds: DataSource,
    @InjectRepository(SupplierPayment) private readonly spRepo: Repository<SupplierPayment>,
    @InjectRepository(Supplier) private readonly supplierRepo: Repository<Supplier>,
    @InjectRepository(CashRegister) private readonly cashRepo: Repository<CashRegister>,
    @InjectRepository(CashMovement) private readonly cmRepo: Repository<CashMovement>,
    @InjectRepository(SupplierAccountEntry) private readonly saeRepo: Repository<SupplierAccountEntry>,
  ) {}

  async create(dto: {
    supplierId: string;
    cashRegisterId: string;
    amount: number;
    paymentMethod: string;
    paymentDate: string;
    description?: string;
  }) {
    return this.ds.transaction(async manager => {
      const supplier = await manager.findOneByOrFail(Supplier, { id: dto.supplierId });
      const cashRegister = await manager.findOneByOrFail(CashRegister, { id: dto.cashRegisterId });

      // 1️⃣ Crear pago
      const payment = manager.create(SupplierPayment, {
        supplier,
        cashRegister,
        amount: dto.amount,
        paymentMethod: dto.paymentMethod,
        paymentDate: new Date(dto.paymentDate),
        status: SupplierPaymentStatus.COMPLETED,
      });
      await manager.save(payment);

      // 2️⃣ Actualizar deuda del proveedor
      const newBalance = supplier.totalDebtCache - dto.amount;
      supplier.totalDebtCache = Math.max(newBalance, 0);
      await manager.save(supplier);

      // 3️⃣ Movimiento en cuenta del proveedor
      const accountEntry = manager.create(SupplierAccountEntry, {
        supplier,
        supplierPayment: payment,
        type: SupplierAccountEntryType.PAYMENT,
        amount: dto.amount,
        balanceAfter: supplier.totalDebtCache,
        description: dto.description ?? `Pago a proveedor ${supplier.name}`,
      });
      await manager.save(accountEntry);

      // 4️⃣ Movimiento de caja
      const movement = manager.create(CashMovement, {
        cashRegister,
        type: 'OUT',
        amount: dto.amount,
        reason: `Pago a proveedor ${supplier.name}`,
        relatedSupplierPayment: payment,
      });
      await manager.save(movement);

      return payment;
    });
  }

  async reverse(paymentId: string) {
    return this.ds.transaction(async manager => {
      const payment = await manager.findOne(SupplierPayment, {
        where: { id: paymentId },
        relations: { supplier: true, cashRegister: true },
      });

      if (!payment) throw new Error('Payment not found');
      if (payment.status !== SupplierPaymentStatus.COMPLETED) {
        throw new Error('Only COMPLETED payments can be reversed');
      }

      // 1️⃣ Revertir estado del pago
      payment.status = SupplierPaymentStatus.REVERSED;
      await manager.save(payment);

      // 2️⃣ Revertir deuda del proveedor
      const supplier = payment.supplier;
      supplier.totalDebtCache = supplier.totalDebtCache + payment.amount;
      await manager.save(supplier);

      // 3️⃣ Movimiento contable del proveedor
      const entry = manager.create(SupplierAccountEntry, {
        supplier,
        supplierPayment: payment,
        type: SupplierAccountEntryType.ADJUSTMENT,
        amount: payment.amount,
        balanceAfter: supplier.totalDebtCache,
        description: `Reversión pago proveedor ${supplier.name}`,
      });
      await manager.save(entry);

      // 4️⃣ Movimiento de caja
      const movement = manager.create(CashMovement, {
        cashRegister: payment.cashRegister,
        type: 'IN',
        amount: payment.amount,
        reason: `Reversión pago proveedor ${supplier.name}`,
        relatedSupplierPayment: payment,
      });
      await manager.save(movement);

      return payment;
    });
  }
}
