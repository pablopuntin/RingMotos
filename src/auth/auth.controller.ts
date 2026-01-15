import { Controller, Body, Post, UseGuards, Get } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthSwagger } from './decorators/auth-swagger.decorator';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { Res } from '@nestjs/common';
import { Req } from '@nestjs/common';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){} 

    
 
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('superadmin')
    @Post('register')
    @ApiOperation({summary: 'registro de usuarios'})
    @ApiBody({type: RegisterDto})
    async register(@Body() registerDto: RegisterDto) {
       return this.authService.register(registerDto);
}


// @Post('login')
// async login(@Body() loginDto: LoginDto) {
//   return this.authService.login(loginDto);
// }

//ref con seteo de cookie
@Post('login')
async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: any) {
  const result = await this.authService.login(loginDto);

  // 👉 Seteamos la cookie HTTP-ONLY
  res.cookie('token', result.access_token, {
    httpOnly: true,
    secure: true,          // obligatorio en Vercel
    sameSite: 'none',      // obligatorio para cross-site (Render → Vercel)
    path: '/',
    maxAge: 24 * 60 * 60 * 1000, // 1 día
  });

  return result; // mantenés tu respuesta igual
}

// en AuthController
@UseGuards(AuthGuard('jwt'))
@Get('me')
getMe(@Req() req) {
  return {
    user: {
      id: req.user.id,
      name: req.user.name,
      role: req.user.role,
    }
  };
}


}
