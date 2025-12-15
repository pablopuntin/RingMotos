// import { ApiProperty } from '@nestjs/swagger';
// import { Column, PrimaryGeneratedColumn, Entity, OneToOne } from 'typeorm';
// import { Sale } from 'src/sale/entities/sale.entity';

// @Entity()
// export class Remito {
//   @ApiProperty({ description: "Identificador único del remito", example: "uuid" })
//   @PrimaryGeneratedColumn('uuid')
//   id: string;
  
//   @ApiProperty({ description: "Número de remito", example: "0001-00001234" })
//   @Column()
//   remitoNumber: string;
  
//   @ApiProperty({ description: "Formato del remito", example: "A4" })
//   @Column()
//   format: string;
  
//   @ApiProperty({ description: "Estado del remito", example: "PRINTED" })
//   @Column({ type: 'enum', enum: ['PENDING', 'PRINTED'] })
//   status: string;
  
//   @ApiProperty({ description: "Fecha de impresión", example: "2025-12-12T20:20:00.000Z" })
//   @Column({ type: 'timestamp', nullable: true })
//   printedAt: Date;
  
//   @ApiProperty({ description: "Venta asociada al remito" })
//   @OneToOne(() => Sale, (sale) => sale.remito)
//   sale: Sale;
// }

import { Column, PrimaryGeneratedColumn, Entity, OneToOne } from 'typeorm';
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
  sale: Sale;
}
