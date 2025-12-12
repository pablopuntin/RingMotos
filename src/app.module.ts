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
import { CashRegisterModule } from './cash-register/cash-register.module';
import { CashMovementModule } from './cash-movement/cash-movement.module';
import { CashMovement } from './cash-movement/entities/cash-movement.entity';
import { CashRegister } from './cash-register/entities/cash-register.entity';
import { Client } from './client/entities/client.entity';

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

      TypeOrmModule.forFeature([User, Role, CashMovement, CashRegister, Client]),
    UserModule,
    AuthModule,
    ClientModule,
    CashRegisterModule,
    CashMovementModule
  ],
  providers: [InitialSeeder]
})
export class AppModule {}
