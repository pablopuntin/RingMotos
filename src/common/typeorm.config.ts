src/config/typeorm.config.ts
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getTypeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',

  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),

  autoLoadEntities: true,

  synchronize: true, // ⚠️ solo si NO es prod crítica
  logging: false,

  ssl: {
    rejectUnauthorized: false, // 🔑 CLAVE para Render
  }
});




// import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { ConfigService } from '@nestjs/config';

// export const getTypeOrmConfig = (
//   config: ConfigService
// ): TypeOrmModuleOptions => {
//   // Console.log para debuguear los .env
//   console.log('DB_USERNAME:', config.get<string>('DB_USER'));
 
//   return {
//     type: 'postgres',
//     url: config.get<string>('DATABASE_URL') || undefined,
//     host: config.get<string>('DB_HOST'),
//     port: config.get<number>('DB_PORT') || 5432,
//     username: config.get<string>('DB_USERNAME'),
//     password: config.get<string>('DB_PASSWORD'),
//     database: config.get<string>('DB_NAME'),
//     ssl: config.get('DATABASE_URL') ? { rejectUnauthorized: false } : false,
//     autoLoadEntities: true,
//     synchronize: true, //true borra todo - DESHABILITADO DESPUÉS DE CREAR TABLA
//     dropSchema: true // ⚠️ Nunca usar true en producción
//   };
// };


  // Local
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
