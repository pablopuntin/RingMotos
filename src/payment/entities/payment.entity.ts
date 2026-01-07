import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { PaymentAllocation } from 'src/payment-allocation/entities/payment-allocation.entity';
import { AccountEntry } from 'src/acount-entry/entities/acount-entry.entity';
import { User } from 'src/user/entities/user.entity';
import { CashRegister } from 'src/cash-register/entities/cash-register.entity';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column()
  paymentMethod: string;

  /* =========================
     QUIÉN RECIBE EL PAGO
  ========================== */
  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'receivedById' })
  receivedBy: User;

  /* =========================
     CAJA
  ========================== */
  @ManyToOne(() => CashRegister, { nullable: false })
  @JoinColumn({ name: 'cashRegisterId' })
  cashRegister: CashRegister;

  /* =========================
     FECHA
  ========================== */
  @CreateDateColumn()
  paymentDate: Date;

  @Column({
    type: 'enum',
    enum: ['PENDING', 'COMPLETED', 'REVERSED'],
    default: 'COMPLETED',
  })
  status: string;

  /* =========================
     RELACIONES
  ========================== */
  @OneToMany(() => PaymentAllocation, (pa) => pa.payment)
  allocations: PaymentAllocation[];

  @OneToMany(() => AccountEntry, (ae) => ae.payment)
  accountEntries: AccountEntry[];
}
