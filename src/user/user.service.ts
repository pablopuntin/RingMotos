// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { User } from './entities/user.entity';
// import { Role } from './entities/role.entity';
// import { CreateUserDto } from './dto/create-user.dto';
// import * as bcrypt from 'bcrypt';
// import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';

// // ref
// @Injectable()
// export class UserService {
//   constructor(
//     @InjectRepository(User)
//     private readonly userRepository: Repository<User>,

//     @InjectRepository(Role)
//     private readonly roleRepository: Repository<Role>
//   ) {}

//   async create(createUserDto: CreateUserDto) {
//   const { email, password, firstname, lastname} = createUserDto;

//   const existing = await this.userRepository.findOne({ where: { email } });
//   if (existing) throw new BadRequestException('Email already exists');

//   const defaultRole = await this.roleRepository.findOne({ where: { name: 'admin' } });
//   if (!defaultRole) throw new BadRequestException('Default role "admin" not found');

// let hashedPassword = password; // YA viene hasheada


//   const user = this.userRepository.create({
//     firstname,
//     lastname,
//     email,
//     password: hashedPassword,   // ✔ ahora sí lo guardamos hasheado
//     roles: [defaultRole],
//   });

//  const saved = await this.userRepository.save(user);

//   // 🔥 sólo devolvés lo que querés
//   const { id } = saved;
//   return { id, firstname, lastname };
// }




//  async findByEmail(email: string) {
//   return this.userRepository.findOne({
//     where: { email },
//     relations: ['roles'],
//   });
// }


//  async findAll (page: number, limit: number){
//   //Parseo page y limit porque llegan com string del front
//     const skip = (page-1)* limit;
//     const users = await this.userRepository.find({

//       //take y skip son propiedades de BD 
//       take: limit,
//       skip: skip,
//     });
//     return users.map(({password,  ...filteredUserData})=> filteredUserData);
//   }

  
// async findOne(id: string) {
//   return this.userRepository.findOne({ where: { id } });
// }

// async update(id: string, updateUserDto: any) {
//   await this.userRepository.update(id, updateUserDto);
//   return this.findOne(id);
// }


// //refactor soft deleted y solo uno puede eliminar su user
// async remove(id: string, currentUser: any) {
//   const user = await this.userRepository.findOne({
//     where: { id },
//     withDeleted: false,
//     relations: ['roles'],
//   });

//   if (!user) {
//     throw new BadRequestException('User not found');
//   }

//   // Helper que soporta roles como strings O como objetos
//   const hasRole = (u: any, role: string) =>
//     u.roles?.some((r: any) =>
//       typeof r === 'string'
//         ? r === role
//         : r.name === role
//     );

//   const isSelf = currentUser.id === user.id;

//   // Roles del usuario a eliminar
//   const targetIsSuperadmin = hasRole(user, 'superadmin');
//   const targetIsAdmin = hasRole(user, 'admin');

//   // Roles del usuario logueado
//   const currentIsSuperadmin = hasRole(currentUser, 'superadmin');
//   const currentIsAdmin = hasRole(currentUser, 'admin');

//   // 🚫 1. Nadie puede eliminar a un superadmin
//   if (targetIsSuperadmin) {
//     throw new BadRequestException('Superadmins cannot be deleted');
//   }

//   // ✔️ 2. Superadmin puede eliminar a cualquiera (menos superadmin)
//   if (currentIsSuperadmin) {
//     await this.userRepository.update(id, { isActive: false });
//     await this.userRepository.softDelete(id);
//     return { message: 'User deleted by superadmin', id };
//   }

//   // ✔️ 3. Un usuario puede eliminarse a sí mismo
//   if (isSelf) {
//     await this.userRepository.softDelete(id);
//     return { message: 'User deleted itself', id };
//   }

//   // ✔️ 4. Admin puede eliminar usuarios normales (que NO sean admin)
//   if (currentIsAdmin && !targetIsAdmin) {
//     await this.userRepository.softDelete(id);
//     return { message: 'User deleted by admin', id };
//   }

//   // ❌ 5. Todo lo demás prohibido
//   throw new BadRequestException('Not allowed to delete this user');
// }


//  //hasta aca funcionaba bien-cambiar pass de admin
//   async resetPasswordAsSuperadmin(
//   targetUserId: string,
//   newPassword: string,
//   currentUser: any,
// ) {
//   const user = await this.userRepository.findOne({
//     where: { id: targetUserId },
//     relations: ['roles'],
//   });

//   if (!user) {
//     throw new NotFoundException('User not found');
//   }

//   // Helper para roles
//   const hasRole = (u: any, role: string) =>
//     u.roles?.some((r: any) =>
//       typeof r === 'string' ? r === role : r.name === role,
//     );

//   const currentIsSuperadmin = hasRole(currentUser, 'superadmin');
//   if (!currentIsSuperadmin) {
//     throw new BadRequestException('Only superadmin can reset passwords');
//   }

//   // Hash del nuevo password
//   const hashedPassword = await bcrypt.hash(newPassword, 10);

//   await this.userRepository.update(user.id, { password: hashedPassword });

//   return { message: 'Password reset successfully', id: user.id };
// }

// }


import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>
  ) {}

  // --------------------------
  // CREATE USER
  // --------------------------
  async create(createUserDto: CreateUserDto) {
    const { email, password, firstname, lastname } = createUserDto;

    const existing = await this.userRepository.findOne({ where: { email } });
    if (existing) throw new BadRequestException('Email already exists');

    const defaultRole = await this.roleRepository.findOne({ where: { name: 'admin' } });
    if (!defaultRole) throw new BadRequestException('Default role "admin" not found');

    const hashedPassword = password; // ya viene hasheada

    const user = this.userRepository.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      role: defaultRole
    });

    const saved = await this.userRepository.save(user);
    const { id } = saved;

    return { id, firstname, lastname };
  }

  // --------------------------
  // FIND BY EMAIL
  // --------------------------
  // async findByEmail(email: string) {
  //   return this.userRepository.findOne({
  //     where: { email },
  //     relations: ['role'],
  //   });
  // }

  async findByEmail(email: string) {
  return this.userRepository
    .createQueryBuilder('user')
    .addSelect('user.password') // 👈 CLAVE
    .leftJoinAndSelect('user.role', 'role')
    .where('user.email = :email', { email })
    .getOne();
}


  // --------------------------
  // FIND ALL
  // --------------------------
  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const users = await this.userRepository.find({
      take: limit,
      skip: skip,
    });

    return users.map(({ password, ...rest }) => rest);
  }

  // --------------------------
  // FIND ONE
  // --------------------------
  async findOne(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }

  // --------------------------
  // UPDATE
  // --------------------------
  async update(id: string, updateUserDto: any) {
    await this.userRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  // --------------------------
  // REMOVE USER (LOGIC + ROLES)
  // --------------------------
  async remove(id: string, currentUser: any) {
    const user = await this.userRepository.findOne({
      where: { id },
      withDeleted: false,
      relations: ['role'],
    });

    if (!user) throw new BadRequestException('User not found');

    // Helper para comparar roles (single role ahora)
    const hasRole = (u: any, role: string) =>
      u.role && (typeof u.role === 'string' ? u.role === role : u.role.name === role);

    const isSelf = currentUser.id === user.id;

    const targetIsSuperadmin = hasRole(user, 'superadmin');
    const targetIsAdmin = hasRole(user, 'admin');

    const currentIsSuperadmin = hasRole(currentUser, 'superadmin');
    const currentIsAdmin = hasRole(currentUser, 'admin');

    // 🚫 1. Nadie puede eliminar superadmin
    if (targetIsSuperadmin) {
      throw new BadRequestException('Superadmins cannot be deleted');
    }

    // ✔️ 2. Superadmin puede eliminar cualquier user (que no sea superadmin)
    if (currentIsSuperadmin) {
      await this.userRepository.update(id, { isActive: false });
      await this.userRepository.softDelete(id);
      return { message: 'User deleted by superadmin', id };
    }

    // ✔️ 3. Un usuario puede eliminarse a sí mismo
    if (isSelf) {
      await this.userRepository.softDelete(id);
      return { message: 'User deleted itself', id };
    }

    // ✔️ 4. Admin puede eliminar usuarios normales
    if (currentIsAdmin && !targetIsAdmin) {
      await this.userRepository.softDelete(id);
      return { message: 'User deleted by admin', id };
    }

    // ❌ 5. Todo lo demás prohibido
    throw new BadRequestException('Not allowed to delete this user');
  }

  // --------------------------
  // SUPERADMIN RESET PASSWORD
  // --------------------------
  async resetPasswordAsSuperadmin(
    targetUserId: string,
    newPassword: string,
    currentUser: any,
  ) {
    const user = await this.userRepository.findOne({
      where: { id: targetUserId },
      relations: ['role'],
    });

    if (!user) throw new NotFoundException('User not found');

    const hasRole = (u: any, role: string) =>
      u.role && (typeof u.role === 'string' ? u.role === role : u.role.name === role);

    const currentIsSuperadmin = hasRole(currentUser, 'superadmin');
    if (!currentIsSuperadmin) {
      throw new BadRequestException('Only superadmin can reset passwords');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.userRepository.update(user.id, { password: hashedPassword });

    return { message: 'Password reset successfully', id: user.id };
  }
}
