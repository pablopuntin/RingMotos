// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { UserService } from './user.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

// @Controller('user')
// export class UserController {
//   constructor(private readonly userService: UserService) {}

//   @Post()
//   create(@Body() createUserDto: CreateUserDto) {
//     return this.userService.create(createUserDto);
//   }

//   @Get()
//   findAll() {
//     return this.userService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.userService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
//     return this.userService.update(+id, updateUserDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.userService.remove(+id);
//   }
// }


//controller de India Talia
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Req } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthSwagger } from '../auth/decorators/auth-swagger.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags, ApiQuery } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ParseUUIDPipe } from '@nestjs/common';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ApiBody, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('Users') // 👈 Esto hace que Swagger la agrupe
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @AuthSwagger()
  //@UseGuards(AuthGuard('jwt'), RolesGuard)
  //@Roles('superadmin')
  @ApiOperation({summary: 'Crear usuarios'})
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  
  //refactor
  @AuthSwagger()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('superadmin')
  @ApiOperation({ summary: 'Mostrar todos los usuarios' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Número de página (por defecto 1)',
    example: 1
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Cantidad de usuarios por página (por defecto 5)',
    example: 5
  })
  @Get()
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    if (page && limit) {
      return this.userService.findAll(Number(page), Number(limit));
    }
    return this.userService.findAll(1, 5);
  }


  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @AuthSwagger()
@UseGuards(AuthGuard('jwt'))
@ApiOperation({ summary: 'Eliminar un usuario' })
@Delete(':id')
remove(
  @Param('id', ParseUUIDPipe) id: string,
  @Req() req,
) {
  const currentUser = req.user; // viene del JWT
  return this.userService.remove(id, currentUser);
}



  @Patch('reset-password/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('superadmin')
  @ApiBearerAuth() // 🔑 Swagger sabe que necesita token
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: ResetPasswordDto }) // 📦 Swagger genera input JSON
  async resetPassword(
    @Param('id') id: string,
    @Body() body: ResetPasswordDto,
    @Req() req
  ) {
    return this.userService.resetPasswordAsSuperadmin(id, body.newPassword, req.user);
  }
  }
