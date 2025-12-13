import { ApiProperty } from '@nestjs/swagger';
import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, CreateDateColumn } from 'typeorm';
import { Client } from 'src/client/entities/client.entity';
import { Sale } from 'src/sale/entities/sale.entity';
import { Payment } from 'src/payment/entities/payment.entity';

@Entity()
export class AccountEntry {
  @ApiProperty({ description: "Identificador único del movimiento en cuenta corriente", example: "uuid" })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: "Cliente asociado" })
  @ManyToOne(() => Client, (client) => client.accountEntries)
  client: Client;

  @ApiProperty({ description: "Tipo de movimiento", example: "CHARGE" })
  @Column({ type: 'enum', enum: ['CHARGE', 'PAYMENT', 'ADJUSTMENT'] })
  type: string;

  @ApiProperty({ description: "Venta asociada (nullable)" })
  @ManyToOne(() => Sale, (sale) => sale.accountEntries, { nullable: true })
  sale: Sale;

  @ApiProperty({ description: "Pago asociado (nullable)" })
  @ManyToOne(() => Payment, (payment) => payment.accountEntries, { nullable: true })
  payment: Payment;

  @ApiProperty({ description: "Monto del movimiento", example: 250.00 })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @ApiProperty({ description: "Balance después del movimiento", example: 1250.00 })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  balanceAfter: number;

  @ApiProperty({ description: "Descripción del movimiento", example: "Pago parcial de factura" })
  @Column()
  description: string;

  @ApiProperty({ description: "Fecha de creación del movimiento" })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: "Estado del movimiento", example: "ACTIVE" })
  @Column()
  status: string;

}
