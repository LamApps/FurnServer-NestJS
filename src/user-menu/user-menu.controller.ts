import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserMenuService } from './user-menu.service';
import { CreateUserMenuDto } from './dto/create-user-menu.dto';
import { UpdateUserMenuDto } from './dto/update-user-menu.dto';

@Controller('user-menu')
export class UserMenuController {
  constructor(private readonly userMenuService: UserMenuService) {}

  @Post()
  create(@Body() createUserMenuDto: CreateUserMenuDto) {
    return this.userMenuService.create(createUserMenuDto);
  }

  @Get()
  findAll() {
    return this.userMenuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userMenuService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserMenuDto: UpdateUserMenuDto) {
    return this.userMenuService.update(+id, updateUserMenuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userMenuService.remove(+id);
  }
}
