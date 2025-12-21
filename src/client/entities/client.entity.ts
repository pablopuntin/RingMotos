// import { Column, PrimaryGeneratedColumn, CreateDateColumn, Entity, OneToMany } from 'typeorm';
// import { Sale } from 'src/sale/entities/sale.entity';
// import { AccountEntry } from 'src/acount-entry/entities/acount-entry.entity';

// @Entity()
// export class Client {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column()
//   dni: number;

//   @Column()
//   name: string;

//   @Column()
//   lastName: string;

//   @Column()
//   phone: number;

//   @Column()
//   adress: string;

//   @Column({ unique: true })
//   email: string;

//   @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
//   totalDebtCache: number;

//   @CreateDateColumn()
//   createdAt: Date;

//   // Relaciones
//   @OneToMany(() => Sale, (sale) => sale.client)
//   sales: Sale[];

//   @OneToMany(() => AccountEntry, (accountEntry) => accountEntry.client)
//   accountEntries: AccountEntry[];
// }

// src/clients/client.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany
} from 'typeorm';
import { Sale } from 'src/sale/entities/sale.entity';
import { AccountEntry } from 'src/acount-entry/entities/acount-entry.entity';

@Entity('client')
export class Client {
  @PrimaryGeneratedColumn('uuid') 
  id: string;

  @Column({ nullable: true })
  dni?: string;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ default: false })
  isFinalConsumer: boolean;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  totalDebtCache: number;

  @CreateDateColumn()
  createdAt: Date;

   @Column({
    type: 'text',
    default: 'https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-pic-design-profile-vector-png-image_40966566.jpg',
  })
  imgUrl: string;

  // Relaciones
  @OneToMany(() => Sale, sale => sale.client)
  sales: Sale[];

  @OneToMany(() => AccountEntry, ae => ae.client)
  accountEntries: AccountEntry[];
}
