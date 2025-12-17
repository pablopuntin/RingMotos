import { Column, PrimaryGeneratedColumn, Entity, OneToOne, JoinColumn } from 'typeorm';
import { Sale } from 'src/sale/entities/sale.entity';

@Entity()
export class Remito {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  remitoNumber: string;

  @Column()
  format: string;

  @Column({ type: 'enum', enum: ['PENDING', 'PRINTED'] })
  status: string;

  @Column({ type: 'timestamp', nullable: true })
  printedAt: Date;

 @OneToOne(() => Sale, (sale) => sale.remito)
@JoinColumn()
sale: Sale;

}
