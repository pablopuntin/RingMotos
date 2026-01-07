import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from 'typeorm';
import { Payment } from 'src/payment/entities/payment.entity';
import { Sale } from 'src/sale/entities/sale.entity';

@Entity()
export class PaymentAllocation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Payment, (payment) => payment.allocations)
  payment: Payment;

  @ManyToOne(() => Sale, (sale) => sale.paymentAllocations)
  sale: Sale;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amountApplied: number;
}

