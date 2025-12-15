// import { ApiProperty } from '@nestjs/swagger';
// import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from 'typeorm';
// import { Sale } from 'src/sale/entities/sale.entity';

// @Entity()
// export class SaleItem {
//   @ApiProperty({ description: "Identificador único del ítem de venta", example: "uuid" })
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @ApiProperty({ description: "Venta asociada al ítem" })
//   @ManyToOne(() => Sale, (sale) => sale.items)
//   sale: Sale;

//   @ApiProperty({ description: "ID del producto (nullable)", example: "prod-123" })
//   @Column({ nullable: true })
//   productId: string;

//   @ApiProperty({ description: "Descripción libre del producto", example: "Caja de tornillos" })
//   @Column()
//   description: string;

//   @ApiProperty({ description: "Cantidad", example: 10 })
//   @Column('int')
//   qty: number;

//   @ApiProperty({ description: "Precio unitario", example: 25.50 })
//   @Column({ type: 'decimal', precision: 10, scale: 2 })
//   unitPrice: number;

//   @ApiProperty({ description: "Total de la línea", example: 255.00 })
//   @Column({ type: 'decimal', precision: 10, scale: 2 })
//   lineTotal: number;
// }

import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from 'typeorm';
import { Sale } from 'src/sale/entities/sale.entity';

@Entity()
export class SaleItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Sale, (sale) => sale.items)
  sale: Sale;

  @Column({ nullable: true })
  productId: string;

  @Column()
  description: string;

  @Column('int')
  qty: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  unitPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  lineTotal: number;
}
