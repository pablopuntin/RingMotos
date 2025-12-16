// src/config/typeorm.config.ts
// import { ConfigService } from '@nestjs/config';
// import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// export const getTypeOrmConfig = (
//   configService: ConfigService,
// ): TypeOrmModuleOptions => ({
//   type: 'postgres',

//   host: configService.get<string>('DB_HOST'),
//   port: configService.get<number>('DB_PORT'),
//   username: configService.get<string>('DB_USER'),
//   password: configService.get<string>('DB_PASSWORD'),
//   database: configService.get<string>('DB_NAME'),

//   autoLoadEntities: true,

//   synchronize: true, // ⚠️ solo si NO es prod crítica
//   logging: false,

//   ssl: {
//     rejectUnauthorized: false, // 🔑 CLAVE para Render
//   }
// });

// src/config/typeorm.config.ts
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getTypeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const url = configService.get<string>('DATABASE_URL');

  if (!url) {
    throw new Error('❌ DATABASE_URL NOT FOUND');
  }

  return {
    type: 'postgres',
    url,
    autoLoadEntities: true,
    synchronize: true, // ⚠️ en prod real se pone false
    ssl: {
      rejectUnauthorized: true
    }
  };
};
