import {
  Entity,
  PrimaryGeneratedColumn, 
  Column, 
  DeleteDateColumn,
  OneToMany,
  ManyToOne
} from 'typeorm';
import { Role } from './role.entity';
import { ApiProperty } from '@nestjs/swagger';
import { CashRegister } from 'src/cash-register/entities/cash-register.entity';

@Entity('user')
export class User {
@ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Identificador único del usuario (UUID)',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Juan',
    description: 'Nombre del usuario',
  })
  @Column()
  firstname: string;

  @ApiProperty({
    example: 'Pérez',
    description: 'Apellido del usuario',
  })
  @Column()
  lastname: string;

  @ApiProperty({
    example: 'juan.perez@example.com',
    description: 'Correo electrónico único del usuario',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    example: 'hashed_password_123',
    description: 'Contraseña del usuario (solo si es autenticación interna)',
    nullable: true
  })
  @Column({ nullable: true })
  password?: string;

   @ApiProperty({
    example: true,
    description: 'Indica si el usuario está activo en el sistema',
  })
  @Column({ default: true })
  isActive: boolean;

  @DeleteDateColumn({nullable: true})
  deletedAt?: Date;

  @ApiProperty({
    type: () => [Role],
    description: 'Lista de roles asociados al usuario',
  })
  

  @ManyToOne(() => Role, role => role.users)
role: Role;


@OneToMany(() => CashRegister, cr => cr.user)
cashRegisters: CashRegister[];


  // @OneToMany(() => Payment, p => p.receivedBy)
  // payments: Payment[];

  // @OneToMany(() => SupplierPayment, sp => sp.user)
  // supplierPayments: SupplierPayment[];
}
