// import { ApiProperty } from '@nestjs/swagger';
// import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from 'typeorm';
// import { Payment } from 'src/payment/entities/payment.entity';
// import { Sale } from 'src/sale/entities/sale.entity';

// @Entity()
// export class PaymentAllocation {
//   @ApiProperty({ description: "Identificador único de la asignación de pago", example: "uuid" })
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @ApiProperty({ description: "Pago asociado" })
//   @ManyToOne(() => Payment, (payment) => payment.allocations)
//   payment: Payment;

//   @ApiProperty({ description: "Venta asociada" })
//   @ManyToOne(() => Sale, (sale) => sale.paymentAllocations)
//   sale: Sale;

//   @ApiProperty({ description: "Monto aplicado a la venta", example: 500.00 })
//   @Column({ type: 'decimal', precision: 10, scale: 2 })
//   amountApplied: number;
// }

import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from 'typeorm';
import { Payment } from 'src/payment/entities/payment.entity';
import { Sale } from 'src/sale/entities/sale.entity';

@Entity()
export class PaymentAllocation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Payment, (payment) => payment.allocations)
  payment: Payment;

  @ManyToOne(() => Sale, (sale) => sale.paymentAllocations)
  sale: Sale;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amountApplied: number;
}

