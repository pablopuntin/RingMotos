import { Column, PrimaryGeneratedColumn, CreateDateColumn, Entity, OneToMany } from 'typeorm';
import { Sale } from 'src/sale/entities/sale.entity';
import { AccountEntry } from 'src/acount-entry/entities/acount-entry.entity';

@Entity()
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  dni: number;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  phone: number;

  @Column()
  adress: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalDebtCache: number;

  @CreateDateColumn()
  createdAt: Date;

  // Relaciones
  @OneToMany(() => Sale, (sale) => sale.client)
  sales: Sale[];

  @OneToMany(() => AccountEntry, (accountEntry) => accountEntry.client)
  accountEntries: AccountEntry[];
}
