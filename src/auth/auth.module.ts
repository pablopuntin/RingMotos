import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { Role } from '../user/entities/role.entity';
import { PassportModule } from '@nestjs/passport';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [
    forwardRef(() => UserModule),//asi solucionamos la dependencia circular
   TypeOrmModule.forFeature([Role, User]),
    PassportModule.register({ defaultStrategy: 'jwt' }), // 👈 necesario
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret123',
      signOptions: { expiresIn: '1d' },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
