// purchases/purchase.entity.ts
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import { PurchaseItem } from 'src/purchase-item/entities/purchase-item.entity';
import { SupplierAccountEntry } from 'src/supplier-account-entry/entities/supplier-account-entry.entity';

export enum PurchaseStatus {
  DRAFT = 'DRAFT',
  CONFIRMED = 'CONFIRMED'
}

@Entity('purchases')
export class Purchase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Supplier, s => s.purchases, { eager: true })
  supplier: Supplier;

  @Column({ type: 'enum', enum: PurchaseStatus, default: PurchaseStatus.DRAFT })
  status: PurchaseStatus;

  @Column({ type: 'numeric', precision: 14, scale: 2, default: 0 })
  totalAmount: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  confirmedAt?: Date;

  @OneToMany(() => PurchaseItem, i => i.purchase, { cascade: true })
  items: PurchaseItem[];

  @OneToMany(() => SupplierAccountEntry, sae => sae.purchase)
  accountEntries: SupplierAccountEntry[];
}
