// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor() {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secretOrKey: process.env.JWT_SECRET || 'secret123',
//     });
//   }

//   // async validate(payload: any) {
//   //   console.log('✅ [JwtStrategy] Token válido, payload:', payload);
//   //   return {
//   //     userId: payload.sub,
//   //   name: payload.name,
//   //  roles: payload.role ? [payload.role] : []
//   //   };
//   // }

//   async validate(payload: any) {
//   console.log('✅ [JwtStrategy] Token válido, payload:', payload);
//   return {
//     id: payload.sub,          // 👈 CLAVE
//     name: payload.name,
//     role: payload.role        // 👈 CLAVE (string)
//   };
// }

// }


//ref para leer cookies
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (req) => req?.cookies?.token, // ← permite leer token desde cookie
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'secret123',
    });
  }

  async validate(payload: any) {
    console.log('✅ [JwtStrategy] Token válido, payload:', payload);

    return {
      id: payload.sub,      // lo que después ves como req.user.id
      name: payload.name,
      role: payload.role,   // string: "admin", "superadmin", etc.
    };
  }
}
