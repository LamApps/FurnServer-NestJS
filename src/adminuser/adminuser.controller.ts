import { Get, Post, Body, Put, Delete, Param, Controller, UsePipes, HttpStatus, applyDecorators, UseInterceptors, UploadedFile } from '@nestjs/common';
import { Request } from 'express';
import { AdminuserService } from './adminuser.service';
import { AdminuserRO } from './adminuser.interface';
import { CreateAdminuserDto, UpdateAdminuserDto, LoginAdminuserDto } from './dto';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { Adminuser } from './adminuser.decorator';
import { ValidationPipe } from '../shared/pipes/validation.pipe';

import { 
  ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags
} from '@nestjs/swagger';
import { Roles } from './roles.decorator';
import { Role } from '../enum/role.enum';
import { AdminuserEntity } from './adminuser.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';

@ApiBearerAuth()
@ApiTags('adminuser')
@Controller()
export class AdminuserController {
  screenService: any;
  constructor(private readonly userService: AdminuserService) {}

  @UsePipes(new ValidationPipe())
  @Post('auth/admin')
  async login(@Body() loginUserDto: LoginAdminuserDto): Promise<AdminuserRO | HttpException> {
    const _user = await this.userService.findOne(loginUserDto);
    if (!_user) return new HttpException('User not found or incorrect password.', HttpStatus.UNAUTHORIZED);
    if (!_user.active) return new HttpException('Inactivated user.', HttpStatus.UNAUTHORIZED);
    const token = await this.userService.generateJWT(_user);
    const updated = await this.userService.update_login(_user.id, token);
    const user = { token, ...updated.item };
    return { status:HttpStatus.OK, user }
  }
  
  @UsePipes(new ValidationPipe())
  @Post('auth/adminregister')
  async register(@Body() userData: CreateAdminuserDto) {
    return this.userService.create(userData);
  }

  @Get('adminuser')
  // @Roles(Role.Admin, Role.Developer)
  async getUsers() {
    return await this.userService.findAll();
  }
  
  @Get('adminuser/:id')
  // @Roles(Role.Admin, Role.Developer)
  async find(@Param('id') id: string) {
    return await this.userService.find(+id);
  }

  @Post('adminuser')
 // @Roles(Role.Admin, Role.Developer)
  async create(@Body() userData: CreateAdminuserDto) {
    return this.userService.create(userData);
  }

  @Put('adminuser/:id')
  // @Roles(Role.Admin, Role.Developer)
  async update(@Param('id') id: string, @Body() userData: UpdateAdminuserDto) {
    return await this.userService.update(+id, userData);
  }

  @Delete('adminuser/:id')
//  @Roles(Role.Admin, Role.Developer)
  async delete(@Param('id') id: string) {
    return await this.userService.remove(+id);
  }

  @ApiOperation({ summary: 'Add Photo'})
  @UseInterceptors(FileInterceptor('photo', {
      storage: diskStorage({
          destination: './uploads',
          filename: (req, file, callback) => {
              const currentDate = new Date();
              const timestamp = currentDate.getTime();
              const ext = extname(file.originalname);
              return callback(null, `${timestamp}${ext}`);
          }
      })
  }))
  @Post("adminuser/uploadPhoto")
  async uploadPhoto(@UploadedFile() photo) {
      return photo;
  }
}
