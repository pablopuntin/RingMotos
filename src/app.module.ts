import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getTypeOrmConfig } from './common/typeorm.config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { InitialSeeder } from './common/seeds/seed.superadmin';
import { User } from './user/entities/user.entity';
import { Role } from './user/entities/role.entity';
import { ClientModule } from './client/client.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),

    // 👇 AQUI activas tu configuración de TypeORM
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: getTypeOrmConfig
    }),

      TypeOrmModule.forFeature([User, Role]),
    UserModule,
    AuthModule,
    ClientModule
  ],
  providers: [InitialSeeder]
})
export class AppModule {}
