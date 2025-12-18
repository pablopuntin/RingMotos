// supplier-account-entries/supplier-account-entry.entity.ts
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import { Purchase } from 'src/purchase/entities/purchase.entity';
import { SupplierPayment } from 'src/supplier-payment/entities/supplier-payment.entity';

export enum SupplierAccountEntryType {
  DEBT = 'DEBT',
  PAYMENT = 'PAYMENT',
  ADJUSTMENT = 'ADJUSTMENT'
}

@Entity('supplier_account_entries')
export class SupplierAccountEntry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Supplier, s => s.supplierAccountEntries, { eager: true })
  supplier: Supplier;

  @ManyToOne(() => Purchase, p => p.accountEntries, { nullable: true })
  purchase?: Purchase;

  @ManyToOne(() => SupplierPayment, sp => sp.supplierAccountEntries, { nullable: true })
  supplierPayment?: SupplierPayment;

 
  @Column({ type: 'numeric', precision: 14, scale: 2 })
  amount: number;

  @Column({ type: 'numeric', precision: 14, scale: 2 })
  balanceAfter: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ length: 24, default: 'ACTIVE' })
  status: string;
}
