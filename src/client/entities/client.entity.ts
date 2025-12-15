// import { ApiProperty } from '@nestjs/swagger';
// import { Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
// import { Entity } from 'typeorm';
// import { Sale } from 'src/sale/entities/sale.entity';
// import { AccountEntry } from 'src/acount-entry/entities/acount-entry.entity';
// import { OneToMany } from 'typeorm';

// @Entity()
// export class Client {
// @PrimaryGeneratedColumn('uuid')
// id : string;

// @ApiProperty({
//     description: "Numero de dni",
//     example: "22555999"
// })
// @Column()
// dni : number;

// @ApiProperty({
//     description: "Nombre del cliente",
//     example: "Juan"
// })
// @Column()
// name: string;

// @ApiProperty({
//     description: "Apellido del cliente",
//     example: "Perez"
// })
// @Column()
// lastName: string;

// @ApiProperty({
//     description: "Telefono del cliente solo numeros, sin guiones, paremtesis o comas",
//     example: "3857408499"
// })
// @Column()
// phone: number;

// @ApiProperty({
//     description: "mail del cliente, opcional",
//     example: "perez@mail.com"
// })
// @Column({unique: true})
// email: string;

//   @ApiProperty({
//     description: "Deuda total del cliente almacenada en caché",
//     example: 1500.75
//   })
//   @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
//   totalDebtCache: number;

//   @ApiProperty({
//     description: "Fecha de creación del registro",
//     example: "2025-12-12T20:10:00.000Z"
//   })
//   @CreateDateColumn()
//   createdAt: Date;

//   // Relaciones
// @OneToMany(() => Sale, (sale) => sale.client)
// sales: Sale[];

// @OneToMany(() => AccountEntry, (accountEntry) => accountEntry.client)
// accountEntries: AccountEntry[];

// }

import { Column, PrimaryGeneratedColumn, CreateDateColumn, Entity, OneToMany } from 'typeorm';
import { Sale } from 'src/sale/entities/sale.entity';
import { AccountEntry } from 'src/acount-entry/entities/acount-entry.entity';

@Entity()
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  dni: number;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  phone: number;

  @Column()
  adress: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalDebtCache: number;

  @CreateDateColumn()
  createdAt: Date;

  // Relaciones
  @OneToMany(() => Sale, (sale) => sale.client)
  sales: Sale[];

  @OneToMany(() => AccountEntry, (accountEntry) => accountEntry.client)
  accountEntries: AccountEntry[];
}
