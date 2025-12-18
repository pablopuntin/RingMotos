import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  OneToMany,
  CreateDateColumn,
  Unique,
} from 'typeorm';
import { Purchase } from 'src/purchase/entities/purchase.entity';
import { SupplierPayment } from 'src/supplier-payment/entities/supplier-payment.entity';
import { SupplierAccountEntry } from 'src/supplier-account-entry/entities/supplier-account-entry.entity';

@Entity('suppliers')
@Unique(['cuit'])
@Unique(['email'])
export class Supplier {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  cuit: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalDebtCache: number;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Purchase, (purchase) => purchase.supplier)
  purchases: Purchase[];

  @OneToMany(() => SupplierPayment, (sp) => sp.supplier)
  supplierPayments: SupplierPayment[];

  @OneToMany(() => SupplierAccountEntry, (sae) => sae.supplier)
  supplierAccountEntries: SupplierAccountEntry[];
}
