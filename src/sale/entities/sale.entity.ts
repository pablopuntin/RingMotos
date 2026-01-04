import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, OneToMany, OneToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { Client } from 'src/client/entities/client.entity';
import { SaleItem } from 'src/sale-item/entities/sale-item.entity';
import { PaymentAllocation } from 'src/payment-allocation/entities/payment-allocation.entity';
import { AccountEntry } from 'src/acount-entry/entities/acount-entry.entity';
import { Remito } from 'src/remito/entities/remito.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Client, client => client.sales)
  client: Client;

  @Column({ type: 'enum', enum: ['DRAFT', 'CONFIRMED', 'CANCELLED', 'PAID_PARTIAL', 'PAID'] })
  status: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  paidAmount: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  confirmedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  printedAt: Date;

  // @OneToMany(() => SaleItem, (item) => item.sale)
  // items: SaleItem[];

  @OneToMany(() => SaleItem, (item) => item.sale, {
  cascade: true,
})
items: SaleItem[];


  @OneToMany(() => PaymentAllocation, (pa) => pa.sale)
  paymentAllocations: PaymentAllocation[];

  @OneToMany(() => AccountEntry, (ae) => ae.sale)
  accountEntries: AccountEntry[];

//  @OneToOne(() => Remito, (remito) => remito.sale, { cascade: true })
// remito: Remito;

@OneToOne(() => Remito, (remito) => remito.sale, {
  nullable: true,
})
@JoinColumn() // 👈 ESTO ES OBLIGATORIO
remito?: Remito;

@ManyToOne(() => User, { nullable: false })
soldBy: User;

}
