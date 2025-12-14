// //con logs, borrar despues
// import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { ROLES_KEY } from '../decorators/roles.decorator';

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean {
//     const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
//       context.getHandler(),
//       context.getClass(),
//     ]);

//     if (!requiredRoles || requiredRoles.length === 0) {
//       console.log('🟡 [RolesGuard] Ruta sin restricción de roles → acceso permitido');
//       return true;
//     }

//     const { user } = context.switchToHttp().getRequest();
//     console.log('🧠 [RolesGuard] Usuario del token:', user);
//     console.log('🔑 [RolesGuard] Roles requeridos:', requiredRoles);

//     const hasRole = user?.roles?.some((role: any) => requiredRoles.includes(role));

//     if (!hasRole) {
//       console.error('🚫 [RolesGuard] El usuario no tiene el rol necesario');
//       throw new ForbiddenException('No tienes permiso para acceder a este recurso');
//     }

//     console.log('✅ [RolesGuard] Rol autorizado');
//     return true;
//   }
// }

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1️⃣ Roles requeridos por el endpoint
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // 2️⃣ Si no hay restricción → permitir acceso
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    // 3️⃣ Usuario inyectado por JwtStrategy
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    console.log('🧠 [RolesGuard] Usuario del token:', user);
    console.log('🔑 [RolesGuard] Roles requeridos:', requiredRoles);

    // 4️⃣ Validaciones defensivas
    if (!user) {
      throw new ForbiddenException('Usuario no autenticado');
    }

    if (!user.role) {
      throw new ForbiddenException('El usuario no tiene rol asignado');
    }

    // 5️⃣ Validación de rol
    const hasRole = requiredRoles.includes(user.role);

    if (!hasRole) {
      console.error(
        `🚫 [RolesGuard] Rol requerido: ${requiredRoles.join(
          ', ',
        )} | Rol del usuario: ${user.role}`,
      );
      throw new ForbiddenException(
        'No tienes permiso para acceder a este recurso',
      );
    }

    console.log('✅ [RolesGuard] Rol autorizado');
    return true;
  }
}
