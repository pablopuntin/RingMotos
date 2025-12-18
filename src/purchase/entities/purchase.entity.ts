// // import { ApiProperty } from '@nestjs/swagger';
// // import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
// // import { Supplier } from 'src/supplier/entities/supplier.entity';
// // import { PurchaseItem } from 'src/purchase-item/entities/purchase-item.entity';
// // import { SupplierAccountEntry } from 'src/supplier-account-entry/entities/supplier-account-entry.entity';

// // @Entity()
// // export class Purchase {
// //   @ApiProperty({ description: "Identificador único de la compra", example: "uuid" })
// //   @PrimaryGeneratedColumn('uuid')
// //   id: string;

// //   @ApiProperty({ description: "Proveedor asociado a la compra" })
// //   @ManyToOne(() => Supplier, (supplier) => supplier.purchases)
// //   supplier: Supplier;

// //   @ApiProperty({ description: "Estado de la compra", example: "CONFIRMED" })
// //   @Column({ type: 'enum', enum: ['DRAFT', 'CONFIRMED'] })
// //   status: string;

// //   @ApiProperty({ description: "Monto total de la compra", example: 3500.00 })
// //   @Column({ type: 'decimal', precision: 10, scale: 2 })
// //   totalAmount: number;

// //   @ApiProperty({ description: "Fecha de creación de la compra" })
// //   @CreateDateColumn()
// //   createdAt: Date;

// //   @ApiProperty({ description: "Fecha de confirmación de la compra", example: "2025-12-12T20:30:00.000Z" })
// //   @Column({ type: 'timestamp', nullable: true })
// //   confirmedAt: Date;

// //   @OneToMany(() => PurchaseItem, (pi) => pi.purchase)
// //   items: PurchaseItem[];

// //   @OneToMany(() => SupplierAccountEntry, (sae) => sae.purchase)
// //   supplierAccountEntries: SupplierAccountEntry[];
// // }

// import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
// import { Supplier } from 'src/supplier/entities/supplier.entity';
// import { PurchaseItem } from 'src/purchase-item/entities/purchase-item.entity';
// import { SupplierAccountEntry } from 'src/supplier-account-entry/entities/supplier-account-entry.entity';

// @Entity()
// export class Purchase {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @ManyToOne(() => Supplier, (supplier) => supplier.purchases)
//   supplier: Supplier;

//   @Column({ type: 'enum', enum: ['DRAFT', 'CONFIRMED'] })
//   status: string;

//   @Column({ type: 'decimal', precision: 10, scale: 2 })
//   totalAmount: number;

//   @CreateDateColumn()
//   createdAt: Date;

//   @Column({ type: 'timestamp', nullable: true })
//   confirmedAt: Date;

//   @OneToMany(() => PurchaseItem, (pi) => pi.purchase)
//   items: PurchaseItem[];

//   @OneToMany(() => SupplierAccountEntry, (sae) => sae.purchase)
//   supplierAccountEntries: SupplierAccountEntry[];
// }


// purchases/purchase.entity.ts
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import { PurchaseItem } from 'src/purchase-item/entities/purchase-item.entity';
import { SupplierAccountEntry } from 'src/supplier-account-entry/entities/supplier-account-entry.entity';

export enum PurchaseStatus {
  DRAFT = 'DRAFT',
  CONFIRMED = 'CONFIRMED'
}

@Entity('purchases')
export class Purchase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Supplier, s => s.purchases, { eager: true })
  supplier: Supplier;

  @Column({ type: 'enum', enum: PurchaseStatus, default: PurchaseStatus.DRAFT })
  status: PurchaseStatus;

  @Column({ type: 'numeric', precision: 14, scale: 2, default: 0 })
  totalAmount: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  confirmedAt?: Date;

  @OneToMany(() => PurchaseItem, i => i.purchase, { cascade: true })
  items: PurchaseItem[];

  @OneToMany(() => SupplierAccountEntry, sae => sae.purchase)
  accountEntries: SupplierAccountEntry[];
}
