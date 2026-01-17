import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Client } from 'src/client/entities/client.entity';

export type RemitoType = 'SALE_FINALIZED' | 'DIRECT_PAYMENT';

@Entity()
export class Remito {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @Column()
  // type: RemitoType;

  @Column()
type:
  | 'SALE_FINALIZED'
  | 'DIRECT_PAYMENT'
  | 'PURCHASE_CONFIRMED'
  | 'SUPPLIER_PAYMENT';


  // Referencias opcionales (no FK fuerte)
  @Column({ nullable: true })
  saleId?: string;

  @Column({ nullable: true })
  paymentId?: string;

  @ManyToOne(() => Client, { eager: true, nullable: true })
 client?: Client | null;
  @Column({ type: 'jsonb' })
  snapshot: any;

  @CreateDateColumn()
  createdAt: Date;
}
