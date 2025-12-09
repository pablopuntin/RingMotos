import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
 imports: [
  forwardRef(() => AuthModule),
  TypeOrmModule.forFeature([User, Role]),
],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService] // 👈 si AuthService lo necesita
})
export class UserModule {}
