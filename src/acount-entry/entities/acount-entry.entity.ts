import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { Client } from 'src/client/entities/client.entity';
import { Sale } from 'src/sale/entities/sale.entity';
import { Payment } from 'src/payment/entities/payment.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class AccountEntry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Client, (client) => client.accountEntries)
  client: Client;

  @Column({ type: 'enum', enum: ['CHARGE', 'PAYMENT', 'ADJUSTMENT'] })
  type: string;

  @ManyToOne(() => Sale, (sale) => sale.accountEntries, { nullable: true })
  sale: Sale;

  @ManyToOne(() => Payment, (payment) => payment.accountEntries, { nullable: true })
  payment: Payment;

  //   @ManyToOne(() => User)
  // @JoinColumn({ name: 'created_by' })
  // createdBy: User;

  @ManyToOne(() => User, { nullable: true })
createdBy: User;



  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  balanceAfter: number;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  status: string;
}
