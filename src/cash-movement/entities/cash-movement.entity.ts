import { ApiProperty } from '@nestjs/swagger';
import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from 'typeorm';
import { CashRegister } from 'src/cash-register/entities/cash-register.entity';

@Entity('cash_movements')
export class CashMovement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cashRegisterId: string;

  @ManyToOne(() => CashRegister, cr => cr.cashMovements)
  cashRegister: CashRegister;

  @ApiProperty({ description: 'Tipo de movimiento', example: 'IN' })
  @Column()
  type: string;

  @ApiProperty({ description: 'Monto del movimiento', example: 500 })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @ApiProperty({ description: 'Motivo del movimiento', example: 'Pago de cliente' })
  @Column()
  reason: string;

  @Column({ nullable: true })
  relatedSaleId: string;

  @Column({ nullable: true })
  relatedPaymentId: string;

  @Column({ nullable: true })
  relatedSupplierPaymentId: string;

  @ApiProperty({ description: 'Fecha de creación' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
