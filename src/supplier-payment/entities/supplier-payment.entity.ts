// supplier-payments/supplier-payment.entity.ts
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import { CashRegister } from 'src/cash-register/entities/cash-register.entity';
import { SupplierAccountEntry } from 'src/supplier-account-entry/entities/supplier-account-entry.entity';
import { CashMovement } from 'src/cash-movement/entities/cash-movement.entity';

export enum SupplierPaymentStatus {
  COMPLETED = 'COMPLETED',
  REVERSED = 'REVERSED'
}

@Entity('supplier_payments')
export class SupplierPayment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Supplier, s => s.supplierPayments, { eager: true })
  supplier: Supplier;

  @ManyToOne(() => CashRegister, c => c.supplierPayments, { eager: true })
  cashRegister: CashRegister;

  @Column({ type: 'numeric', precision: 14, scale: 2 })
  amount: number;

  @Column({ length: 40 })
  paymentMethod: string;

  @Column({ type: 'timestamp' })
  paymentDate: Date;

  @Column({ type: 'enum', enum: SupplierPaymentStatus, default: SupplierPaymentStatus.COMPLETED })
  status: SupplierPaymentStatus;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => SupplierAccountEntry, sae => sae.supplierPayment)
  supplierAccountEntries: SupplierAccountEntry[];

  @OneToMany(() => CashMovement, cm => cm.relatedSupplierPayment)
  cashMovements: CashMovement[];

 
}
