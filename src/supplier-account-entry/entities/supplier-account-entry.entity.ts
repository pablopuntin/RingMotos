// import { ApiProperty } from '@nestjs/swagger';
// import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, CreateDateColumn } from 'typeorm';
// import { Supplier } from 'src/supplier/entities/supplier.entity';
// import { Purchase } from 'src/purchase/entities/purchase.entity';
// import { SupplierPayment } from 'src/supplier-payment/entities/supplier-payment.entity';

// @Entity()
// export class SupplierAccountEntry {
//   @ApiProperty({ description: "Identificador único del movimiento en cuenta corriente de proveedor", example: "uuid" })
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @ApiProperty({ description: "Proveedor asociado" })
//   @ManyToOne(() => Supplier, (supplier) => supplier.supplierAccountEntries)
//   supplier: Supplier;

//   @ApiProperty({ description: "Compra asociada (nullable)" })
//   @ManyToOne(() => Purchase, (purchase) => purchase.supplierAccountEntries, { nullable: true })
//   purchase: Purchase;

//   @ApiProperty({ description: "Pago asociado (nullable)" })
//   @ManyToOne(() => SupplierPayment, (sp) => sp.supplierAccountEntries, { nullable: true })
//   supplierPayment: SupplierPayment;

//   @ApiProperty({ description: "Tipo de movimiento", example: "DEBT" })
//   @Column({ type: 'enum', enum: ['DEBT', 'PAYMENT'] })
//   type: string;

//   @ApiProperty({ description: "Monto del movimiento", example: 3000.00 })
//   @Column({ type: 'decimal', precision: 10, scale: 2 })
//   amount: number;

//   @ApiProperty({ description: "Balance después del movimiento", example: 12000.00 })
//   @Column({ type: 'decimal', precision: 10, scale: 2 })
//   balanceAfter: number;

//   @ApiProperty({ description: "Fecha de creación del movimiento" })
//   @CreateDateColumn()
//   createdAt: Date;

//   @ApiProperty({ description: "Descripción del movimiento", example: "Pago parcial de compra" })
//   @Column()
//   description: string;
// }

import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, CreateDateColumn } from 'typeorm';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import { Purchase } from 'src/purchase/entities/purchase.entity';
import { SupplierPayment } from 'src/supplier-payment/entities/supplier-payment.entity';

@Entity()
export class SupplierAccountEntry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Supplier, (supplier) => supplier.supplierAccountEntries)
  supplier: Supplier;

  @ManyToOne(() => Purchase, (purchase) => purchase.supplierAccountEntries, { nullable: true })
  purchase: Purchase;

  @ManyToOne(() => SupplierPayment, (sp) => sp.supplierAccountEntries, { nullable: true })
  supplierPayment: SupplierPayment;

  @Column({ type: 'enum', enum: ['DEBT', 'PAYMENT'] })
  type: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  balanceAfter: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  description: string;
}
