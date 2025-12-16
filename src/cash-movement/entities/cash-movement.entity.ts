import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { CashRegister } from 'src/cash-register/entities/cash-register.entity';

@Entity('cash_movements')
export class CashMovement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

 
  @Column()
  type: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column()
  reason: string;

  @Column({ nullable: true })
  relatedSaleId: string;

  @Column({ nullable: true })
  relatedPaymentId: string;

  @Column({ nullable: true })
  relatedSupplierPaymentId: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  // 👇 Relación con CashRegister enlazada al campo cashRegisterId
  @ManyToOne(() => CashRegister, (cr) => cr.cashMovements)
  @JoinColumn({ name: 'cashRegisterId' })
  cashRegister: CashRegister;
}
