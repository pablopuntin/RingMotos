import { ApiProperty } from '@nestjs/swagger';
import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, OneToMany, OneToOne, CreateDateColumn } from 'typeorm';
import { Client } from 'src/client/entities/client.entity';
import { SaleItem } from 'src/sale-item/entities/sale-item.entity';
import { PaymentAllocation } from 'src/payment-allocation/entities/payment-allocation.entity';
import { AccountEntry } from 'src/acount-entry/entities/acount-entry.entity';
import { Remito } from 'src/remito/entities/remito.entity';

@Entity()
export class Sale {
  @ApiProperty({ description: "Identificador único de la venta", example: "uuid" })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: "Cliente asociado a la venta" })
  @ManyToOne(() => Client, client => client.sales)
client: Client;


  @ApiProperty({ description: "Estado de la venta", example: "CONFIRMED" })
  @Column({ type: 'enum', enum: ['DRAFT', 'CONFIRMED', 'CANCELLED', 'PAID_PARTIAL', 'PAID'] })
  status: string;

  @ApiProperty({ description: "Monto total de la venta", example: 2500.50 })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalAmount: number;

  @ApiProperty({ description: "Monto pagado", example: 1000.00 })
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  paidAmount: number;

  @ApiProperty({ description: "Fecha de creación de la venta" })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: "Fecha de confirmación de la venta", example: "2025-12-12T20:10:00.000Z" })
  @Column({ type: 'timestamp', nullable: true })
  confirmedAt: Date;

  @ApiProperty({ description: "Fecha de impresión del comprobante", example: "2025-12-12T20:15:00.000Z" })
  @Column({ type: 'timestamp', nullable: true })
  printedAt: Date;

  @OneToMany(() => SaleItem, (item) => item.sale)
  items: SaleItem[];

  @OneToMany(() => PaymentAllocation, (pa) => pa.sale)
  paymentAllocations: PaymentAllocation[];

  @OneToMany(() => AccountEntry, (ae) => ae.sale)
  accountEntries: AccountEntry[];

  @OneToOne(() => Remito, (remito) => remito.sale)
  remito: Remito;
}
