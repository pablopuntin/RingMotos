// // import { Column, PrimaryGeneratedColumn, Entity, OneToOne, JoinColumn } from 'typeorm';
// // import { Sale } from 'src/sale/entities/sale.entity';

// // @Entity()
// // export class Remito {
// //   @PrimaryGeneratedColumn('uuid')
// //   id: string;

// //   @Column()
// //   remitoNumber: string;

// //   @Column()
// //   format: string;

// //   @Column({ type: 'enum', enum: ['PENDING', 'PRINTED'] })
// //   status: string;

// //   @Column({ type: 'timestamp', nullable: true })
// //   printedAt: Date;

// //  @OneToOne(() => Sale, (sale) => sale.remito)
// // @JoinColumn()
// // sale: Sale;

// // }

// // remitos/remito.entity.ts
// import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
// import { Sale } from 'src/sale/entities/sale.entity';

// @Entity('remitos')
// export class Remito {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @OneToOne(() => Sale, s => s.remito, { eager: true })
//   sale: Sale;

//   @Column({ length: 30, unique: true })
//   remitoNumber: string;

//   @Column({ length: 20, default: 'A4' })
//   format: string;

//   @Column({ length: 20, default: 'PENDING' })
//   status: string;

//   @Column({ type: 'timestamp', nullable: true })
//   printedAt?: Date;

//   @CreateDateColumn()
//   createdAt: Date;
// }


//ref
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

  @Column()
  type: RemitoType;

  // Referencias opcionales (no FK fuerte)
  @Column({ nullable: true })
  saleId?: string;

  @Column({ nullable: true })
  paymentId?: string;

  @ManyToOne(() => Client, { eager: true })
  client: Client;

  @Column({ type: 'jsonb' })
  snapshot: any;

  @CreateDateColumn()
  createdAt: Date;
}
