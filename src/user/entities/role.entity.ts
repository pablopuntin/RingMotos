// // src/users/entities/role.entity.ts
// import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
// import { User } from './user.entity';

// @Entity('roles')
// export class Role {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column({ unique: true })
//   name: string; // Ej: 'superAdmin', 'user', 'manager', etc.

//   @Column({ nullable: true })
//   description?: string;

//   @ManyToMany(() => User, (user) => user.roles)
//   users: User[];
// }


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

  // @ApiProperty({ description: 'Permisos en formato JSONB' })
  // @Column({ type: 'jsonb', nullable: true })
  // permissions: Record<string, any>;

  @OneToMany(() => User, user => user.role)
  users: User[];
}
