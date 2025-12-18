import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, OneToMany } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { CashMovement } from 'src/cash-movement/entities/cash-movement.entity';
import { SupplierPayment } from 'src/supplier-payment/entities/supplier-payment.entity';

@Entity('cash_registers')
export class CashRegister {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  openingAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  closingAmount: number;

  @Column()
  status: string;

  @Column()
  openedBy: string;

  @Column({ type: 'timestamp' })
  openedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  closedAt: Date;

  @ManyToOne(() => User, (user) => user.cashRegisters)
  user: User;

  @OneToMany(() => CashMovement, (cm) => cm.cashRegister)
  cashMovements: CashMovement[];

// @OneToMany(() => Payment, p => p.cashRegister)
// payments: Payment[];

 @OneToMany(() => SupplierPayment, sp => sp.cashRegister)
 supplierPayments: SupplierPayment[];
}
