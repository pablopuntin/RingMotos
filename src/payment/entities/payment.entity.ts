// import { ApiProperty } from '@nestjs/swagger';
// import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from 'typeorm';
// import { PaymentAllocation } from 'src/payment-allocation/entities/payment-allocation.entity';
// import { AccountEntry } from 'src/acount-entry/entities/acount-entry.entity';

// @Entity()
// export class Payment {
//   @ApiProperty({ description: "Identificador único del pago", example: "uuid" })
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @ApiProperty({ description: "Monto del pago", example: 1500.75 })
//   @Column({ type: 'decimal', precision: 10, scale: 2 })
//   amount: number;

//   @ApiProperty({ description: "Método de pago", example: "CASH" })
//   @Column()
//   paymentMethod: string;

//   @ApiProperty({ description: "Usuario que recibió el pago (FK users.id)", example: "user-123" })
//   @Column()
//   receivedBy: string;

//   @ApiProperty({ description: "Caja registradora asociada (FK cash_registers.id)", example: "cash-001" })
//   @Column()
//   cashRegisterId: string;

//   @ApiProperty({ description: "Fecha del pago", example: "2025-12-12T20:25:00.000Z" })
//   @Column({ type: 'timestamp' })
//   paymentDate: Date;

//   @ApiProperty({ description: "Estado del pago", example: "COMPLETED" })
//   @Column({ type: 'enum', enum: ['PENDING', 'COMPLETED', 'REVERSED'] })
//   status: string;

//   @OneToMany(() => PaymentAllocation, (pa) => pa.payment)
//   allocations: PaymentAllocation[];

//   @OneToMany(() => AccountEntry, (ae) => ae.payment)
//   accountEntries: AccountEntry[];
// }

import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from 'typeorm';
import { PaymentAllocation } from 'src/payment-allocation/entities/payment-allocation.entity';
import { AccountEntry } from 'src/acount-entry/entities/acount-entry.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column()
  paymentMethod: string;

  @Column()
  receivedBy: string;

  @Column()
  cashRegisterId: string;

  @Column({ type: 'timestamp' })
  paymentDate: Date;

  @Column({ type: 'enum', enum: ['PENDING', 'COMPLETED', 'REVERSED'] })
  status: string;

  @OneToMany(() => PaymentAllocation, (pa) => pa.payment)
  allocations: PaymentAllocation[];

  @OneToMany(() => AccountEntry, (ae) => ae.payment)
  accountEntries: AccountEntry[];
}
