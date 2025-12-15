// import { ApiProperty } from '@nestjs/swagger';
// import { Column, PrimaryGeneratedColumn, Entity, OneToMany, CreateDateColumn } from 'typeorm';
// import { Purchase } from 'src/purchase/entities/purchase.entity';
// import { SupplierPayment } from 'src/supplier-payment/entities/supplier-payment.entity';
// import { SupplierAccountEntry } from 'src/supplier-account-entry/entities/supplier-account-entry.entity';

// @Entity()
// export class Supplier {
//   @ApiProperty({ description: "Identificador único del proveedor", example: "uuid" })
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @ApiProperty({ description: "Nombre del proveedor", example: "Ferretería López" })
//   @Column()
//   name: string;

//   @ApiProperty({ description: "CUIT del proveedor", example: "20-12345678-9" })
//   @Column()
//   cuit: string;

//   @ApiProperty({ description: "Teléfono del proveedor", example: "3857408499" })
//   @Column()
//   phone: string;

//   @ApiProperty({ description: "Correo electrónico del proveedor", example: "proveedor@mail.com" })
//   @Column()
//   email: string;

//   @ApiProperty({ description: "Dirección del proveedor", example: "Av. Belgrano 123" })
//   @Column()
//   address: string;

//   @ApiProperty({ description: "Deuda total del proveedor en caché", example: 5000.00 })
//   @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
//   totalDebtCache: number;

//   @ApiProperty({ description: "Fecha de creación del registro" })
//   @CreateDateColumn()
//   createdAt: Date;

//   @OneToMany(() => Purchase, (purchase) => purchase.supplier)
//   purchases: Purchase[];

//   @OneToMany(() => SupplierPayment, (sp) => sp.supplier)
//   supplierPayments: SupplierPayment[];

//   @OneToMany(() => SupplierAccountEntry, (sae) => sae.supplier)
//   supplierAccountEntries: SupplierAccountEntry[];
// }

import { Column, PrimaryGeneratedColumn, Entity, OneToMany, CreateDateColumn } from 'typeorm';
import { Purchase } from 'src/purchase/entities/purchase.entity';
import { SupplierPayment } from 'src/supplier-payment/entities/supplier-payment.entity';
import { SupplierAccountEntry } from 'src/supplier-account-entry/entities/supplier-account-entry.entity';

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  cuit: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalDebtCache: number;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Purchase, (purchase) => purchase.supplier)
  purchases: Purchase[];

  @OneToMany(() => SupplierPayment, (sp) => sp.supplier)
  supplierPayments: SupplierPayment[];

  @OneToMany(() => SupplierAccountEntry, (sae) => sae.supplier)
  supplierAccountEntries: SupplierAccountEntry[];
}
