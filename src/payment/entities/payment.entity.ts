import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from 'typeorm';
import { PaymentAllocation } from 'src/payment-allocation/entities/payment-allocation.entity';
import { AccountEntry } from 'src/acount-entry/entities/acount-entry.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column()
  paymentMethod: string;

  @Column()
  receivedBy: string;

  @Column()
  cashRegisterId: string;

  @Column({ type: 'timestamp' })
  paymentDate: Date;

  @Column({ type: 'enum', enum: ['PENDING', 'COMPLETED', 'REVERSED'] })
  status: string;

  @OneToMany(() => PaymentAllocation, (pa) => pa.payment)
  allocations: PaymentAllocation[];

  @OneToMany(() => AccountEntry, (ae) => ae.payment)
  accountEntries: AccountEntry[];
}
