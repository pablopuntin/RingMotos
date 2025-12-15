// import { ApiProperty } from '@nestjs/swagger';
// import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, OneToMany } from 'typeorm';
// import { User } from 'src/user/entities/user.entity';
// import { CashMovement } from 'src/cash-movement/entities/cash-movement.entity';

// @Entity('cash_registers')
// export class CashRegister {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @ApiProperty({ description: 'Nombre de la caja', example: 'Caja Principal' })
//   @Column()
//   name: string;

//   @ApiProperty({ description: 'Monto de apertura', example: 1000 })
//   @Column({ type: 'decimal', precision: 10, scale: 2 })
//   openingAmount: number;

//   @ApiProperty({ description: 'Monto de cierre', example: 1500 })
//   @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
//   closingAmount: number;

//   @ApiProperty({ description: 'Estado de la caja', example: 'OPEN' })
//   @Column()
//   status: string;

//   @Column()
//   openedBy: string;

  
//   @ApiProperty({ description: 'Fecha de apertura' })
//   @Column({ type: 'timestamp' })
//   openedAt: Date;
  
//   @ApiProperty({ description: 'Fecha de cierre' })
//   @Column({ type: 'timestamp', nullable: true })
//   closedAt: Date;
 
//   @ManyToOne(() => User, user => user.cashRegisters)
//   user: User;
  
//   @OneToMany(() => CashMovement, cm => cm.cashRegister)
//   cashMovements: CashMovement[];



//@OneToMany(() => Payment, p => p.cashRegister)
//payments: Payment[];

//@OneToMany(() => SupplierPayment, sp => sp.cashRegister)
//supplierPayments: SupplierPayment[];
// }

import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, OneToMany } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { CashMovement } from 'src/cash-movement/entities/cash-movement.entity';

@Entity('cash_registers')
export class CashRegister {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  openingAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  closingAmount: number;

  @Column()
  status: string;

  @Column()
  openedBy: string;

  @Column({ type: 'timestamp' })
  openedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  closedAt: Date;

  @ManyToOne(() => User, (user) => user.cashRegisters)
  user: User;

  @OneToMany(() => CashMovement, (cm) => cm.cashRegister)
  cashMovements: CashMovement[];

  // @OneToMany(() => Payment, p => p.cashRegister)
  // payments: Payment[];

  // @OneToMany(() => SupplierPayment, sp => sp.cashRegister)
  // supplierPayments: SupplierPayment[];
}
