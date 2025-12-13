import { ApiProperty } from '@nestjs/swagger';
import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from 'typeorm';
import { User } from './user.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Nombre del rol', example: 'Administrador' })
  @Column()
  name: string;

  @ApiProperty({ description: 'Descripción del rol', example: 'Acceso completo al sistema' })
  @Column({nullable: true })
  description: string;

  @OneToMany(() => User, user => user.role)
  users: User[];
}
