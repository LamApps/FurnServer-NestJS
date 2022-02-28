import { Get, Post, Body, Put, Delete, Param, Controller, UsePipes, HttpStatus, applyDecorators, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { UserRO } from './user.interface';
import { CreateUserDto, UpdateUserDto, LoginUserDto } from './dto';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { User } from './user.decorator';
import { ValidationPipe } from '../shared/pipes/validation.pipe';

import {
  ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags
} from '@nestjs/swagger';
import { Roles } from './roles.decorator';
import { Role } from '../enum/role.enum';
import { UserEntity } from './user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';

@ApiBearerAuth()
@ApiTags('user')
@Controller()
export class UserController {
  screenService: any;
  constructor(private readonly userService: UserService) {}

  @UsePipes(new ValidationPipe())
  @Post('auth/login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<any | HttpException> {
    let _user = await this.userService.findOne(loginUserDto);
    if (!_user) return new HttpException('User not found or incorrect password.', HttpStatus.UNAUTHORIZED);
    if (!_user.active) return new HttpException('Inactivated user.', HttpStatus.UNAUTHORIZED);
    if (!_user.company.active) return new HttpException('Sorry this company is inactive.  Please contact Support.', HttpStatus.UNAUTHORIZED);
    const token = await this.userService.generateJWT(_user);
    _user = await this.userService.update_login(_user.id, loginUserDto, token)
    const user = { token, ..._user };
    return { status: HttpStatus.OK, user }
  }
  
  @UsePipes(new ValidationPipe())
  @Post('auth/register')
  async register(@Body() userData: CreateUserDto) {
    return await this.userService.create(userData);
  }

  @Get('user/:id')
  // @Roles(Role.Admin, Role.Developer)
  async find(@Param('id') id: string) {
    return await this.userService.find(+id);
  }


  @Get('user/company/:id')
  // @Roles(Role.Admin, Role.Developer)
  async getLimitedUsers(@Param('id') id: string) {
    return await this.userService.findAllLimited(+id);
  }

  @Get('user')
 // @Roles(Role.Admin, Role.Developer)
  async getUsers() {
    return await this.userService.findAll();
  }

  @Get('auth/database')
  async getDatabase(@Query() params) {
    return await this.userService.getDatabase(params.username, params.company);
  }
  
  @Post('user')
 // @Roles(Role.Admin, Role.Developer)
  async create(@Body() userData: CreateUserDto) {
    return this.userService.create(userData);
  }

  @Put('user/:id')
  // @Roles(Role.Admin, Role.Developer)
  async update(@Param('id') id: string, @Body() userData: UpdateUserDto) {
    return await this.userService.update(+id, userData);
  }

  @Delete('user/:id')
 // @Roles(Role.Admin, Role.Developer)
  async delete(@Param('id') id: string) {
    return await this.userService.remove(+id);
  }

  @Post('user/permission/:id')
  // @Roles(Role.Admin, Role.Developer)
  async permission(@Param('id') id: string, @Body() dto) {
    return await this.userService.updatePermission(+id, +dto.role, dto.list);
  }

  @ApiOperation({ summary: 'Add Photo'})
  @UseInterceptors(FileInterceptor('photo', {
      storage: diskStorage({
          destination: '../uploads',
          filename: (req, file, callback) => {
              const currentDate = new Date();
              const timestamp = currentDate.getTime();
              const ext = extname(file.originalname);
              return callback(null, `${timestamp}${ext}`);
          }
      })
  }))
  @Post("user/uploadPhoto")
  async uploadPhoto(@UploadedFile() photo) {
      return photo;
  }
}
