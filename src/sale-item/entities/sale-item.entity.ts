import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { Sale } from 'src/sale/entities/sale.entity';


@Entity()
export class SaleItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @ManyToOne(() => Sale, (sale) => sale.items)
  // sale: Sale;

 @ManyToOne(() => Sale, (sale) => sale.items, {
  nullable: false,
  onDelete: 'CASCADE',
})
@JoinColumn({ name: 'saleId' })
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
