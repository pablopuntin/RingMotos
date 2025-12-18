// // import { ApiProperty } from '@nestjs/swagger';
// // import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from 'typeorm';
// // import { Purchase } from 'src/purchase/entities/purchase.entity';

// // @Entity()
// // export class PurchaseItem {
// //   @ApiProperty({ description: "Identificador único del ítem de compra", example: "uuid" })
// //   @PrimaryGeneratedColumn('uuid')
// //   id: string;

// //   @ApiProperty({ description: "Compra asociada al ítem" })
// //   @ManyToOne(() => Purchase, (purchase) => purchase.items)
// //   purchase: Purchase;

// //   @ApiProperty({ description: "ID del producto (nullable)", example: "prod-456" })
// //   @Column({ nullable: true })
// //   productId: string;

// //   @ApiProperty({ description: "Descripción libre del producto", example: "Bolsa de cemento" })
// //   @Column()
// //   description: string;

// //   @ApiProperty({ description: "Cantidad", example: 20 })
// //   @Column('int')
// //   qty: number;

// //   @ApiProperty({ description: "Costo unitario", example: 1200.00 })
// //   @Column({ type: 'decimal', precision: 10, scale: 2 })
// //   unitCost: number;

// //   @ApiProperty({ description: "Total de la línea", example: 24000.00 })
// //   @Column({ type: 'decimal', precision: 10, scale: 2 })
// //   lineTotal: number;
// // }

// import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from 'typeorm';
// import { Purchase } from 'src/purchase/entities/purchase.entity';

// @Entity()
// export class PurchaseItem {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @ManyToOne(() => Purchase, (purchase) => purchase.items)
//   purchase: Purchase;

//   @Column({ nullable: true })
//   productId: string;

//   @Column()
//   description: string;

//   @Column('int')
//   qty: number;

//   @Column({ type: 'decimal', precision: 10, scale: 2 })
//   unitCost: number;

//   @Column({ type: 'decimal', precision: 10, scale: 2 })
//   lineTotal: number;
// }

// purchases/purchase-item.entity.ts
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Purchase } from 'src/purchase/entities/purchase.entity';

@Entity('purchase_items')
export class PurchaseItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Purchase, p => p.items, { onDelete: 'CASCADE' })
  purchase: Purchase;

  @Column({ nullable: true })
  productId?: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'numeric', precision: 14, scale: 2 })
  qty: string;

  @Column({ type: 'numeric', precision: 14, scale: 2 })
  unitCost: string;

  @Column({ type: 'numeric', precision: 14, scale: 2 })
  lineTotal: string;
}

