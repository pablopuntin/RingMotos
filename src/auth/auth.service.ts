import { Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, firstname, lastname } = registerDto;

    if (!firstname || !lastname)
      throw new BadRequestException('El nombre del usuario es requerido');

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.userService.create({
      ...registerDto,
      password: hashedPassword
    });

    return { message: 'Usuario registrado con éxito' };
  }

 
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userService.findByEmail(email);

    if (!user)
      throw new BadRequestException('Email o Password inválido');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      throw new BadRequestException('Email o Password inválido');

    // ⚠️ user.role ES UN SOLO OBJETO Role
    const payload = {
      sub: user.id,
      name: user.firstname,
      role: user.role?.name  // 👈 AHORA ES ASÍ
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.firstname,
        role: user.role?.name  // 👈 LO MISMO AQUÍ
      }
    };
  }
}
