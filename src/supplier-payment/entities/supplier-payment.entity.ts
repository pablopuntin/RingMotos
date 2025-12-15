// import { ApiProperty } from '@nestjs/swagger';
// import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, OneToMany } from 'typeorm';
// import { Supplier } from 'src/supplier/entities/supplier.entity';
// import { SupplierAccountEntry } from 'src/supplier-account-entry/entities/supplier-account-entry.entity';

// @Entity()
// export class SupplierPayment {
//   @ApiProperty({ description: "Identificador único del pago a proveedor", example: "uuid" })
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @ApiProperty({ description: "Proveedor asociado al pago" })
//   @ManyToOne(() => Supplier, (supplier) => supplier.supplierPayments)
//   supplier: Supplier;

//   @ApiProperty({ description: "Caja registradora asociada (FK)", example: "cash-002" })
//   @Column()
//   cashRegisterId: string;

//   @ApiProperty({ description: "Monto del pago", example: 5000.00 })
//   @Column({ type: 'decimal', precision: 10, scale: 2 })
//   amount: number;

//   @ApiProperty({ description: "Método de pago", example: "TRANSFER" })
//   @Column()
//   paymentMethod: string;

//   @ApiProperty({ description: "Fecha del pago", example: "2025-12-12T20:35:00.000Z" })
//   @Column({ type: 'timestamp' })
//   paymentDate: Date;

//   @ApiProperty({ description: "Estado del pago", example: "COMPLETED" })
//   @Column({ type: 'enum', enum: ['COMPLETED', 'REVERSED'] })
//   status: string;

//   @OneToMany(() => SupplierAccountEntry, (sae) => sae.supplierPayment)
//   supplierAccountEntries: SupplierAccountEntry[];
// }

import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import { SupplierAccountEntry } from 'src/supplier-account-entry/entities/supplier-account-entry.entity';

@Entity()
export class SupplierPayment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Supplier, (supplier) => supplier.supplierPayments)
  supplier: Supplier;

  @Column()
  cashRegisterId: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column()
  paymentMethod: string;

  @Column({ type: 'timestamp' })
  paymentDate: Date;

  @Column({ type: 'enum', enum: ['COMPLETED', 'REVERSED'] })
  status: string;

  @OneToMany(() => SupplierAccountEntry, (sae) => sae.supplierPayment)
  supplierAccountEntries: SupplierAccountEntry[];
}
