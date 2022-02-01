import { Controller, Get, Post, Body, Put, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { PasswordService } from './password.service';
import { CreatePasswordDto } from './dto/create-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { Role } from '../enum/role.enum';
import { Roles } from '../user/roles.decorator';

@Controller('password')
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @Roles(Role.Admin, Role.Developer)
  async create(@Body() createPasswordDto: CreatePasswordDto) {
    return this.passwordService.create(createPasswordDto);
  }

  @Get()
  // @Roles(Role.Admin, Role.Developer)
  async findAll() {
    return this.passwordService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin, Role.Developer)
  async findOne(@Param('id') id: string) {
    return this.passwordService.findOne(+id);
  }

  @Put(':id')
  @Roles(Role.Admin, Role.Developer)
  async update(@Param('id') id: string, @Body() updatePasswordDto: UpdatePasswordDto) {
    return this.passwordService.update(+id, updatePasswordDto);
  }

  @Delete(':id')
  @Roles(Role.Admin, Role.Developer)
  async remove(@Param('id') id: string) {
    return this.passwordService.remove(+id);
  }
}
