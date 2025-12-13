// src/config/typeorm.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getTypeOrmConfig = (
  config: ConfigService
): TypeOrmModuleOptions => {
  // Console.log para debuguear los .env
  console.log('DB_USERNAME:', config.get<string>('DB_USER'));
 
  return {
    type: 'postgres',
    url: config.get<string>('DATABASE_URL') || undefined,
    host: config.get<string>('DB_HOST'),
    port: config.get<number>('DB_PORT') || 5432,
    username: config.get<string>('DB_USERNAME'),
    password: config.get<string>('DB_PASSWORD'),
    database: config.get<string>('DB_NAME'),
    ssl: config.get('DATABASE_URL') ? { rejectUnauthorized: false } : false,
    autoLoadEntities: true,
    synchronize: true, //true borra todo - DESHABILITADO DESPUÉS DE CREAR TABLA
    dropSchema: true // ⚠️ Nunca usar true en producción
  };
};




// import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { ConfigService } from '@nestjs/config';

// export const getTypeOrmConfig = (
//   config: ConfigService
// ): TypeOrmModuleOptions => {
//   const dbUrl = config.get<string>('DATABASE_URL');

//   if (dbUrl) {
//     // Render (producción)
//     return {
//       type: 'postgres',
//       url: dbUrl,
//       ssl: { rejectUnauthorized: false },
//       autoLoadEntities: true,
//       synchronize: true, // ⚠️ solo en desarrollo
//     };
//   }

//   // Local
//   return {
//     type: 'postgres',
//     host: config.get<string>('DB_HOST'),
//     port: parseInt(config.get<string>('DB_PORT'), 10),
//     username: config.get<string>('DB_USER'),
//     password: config.get<string>('DB_PASSWORD'),
//     database: config.get<string>('DB_NAME'),
//     autoLoadEntities: true,
//     synchronize: true,
//   };
// };
