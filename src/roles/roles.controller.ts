import { Controller, Get, Post, Body, Put, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRolesDto } from './dto/create-roles.dto';
import { UpdateRolesDto } from './dto/update-roles.dto';
import { Role } from '../enum/role.enum';
import { Roles } from '../user/roles.decorator';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  // @Roles(Role.Admin, Role.Developer)
  async create(@Body() createRolesDto: CreateRolesDto) {
    return this.rolesService.create(createRolesDto);
  }

  @Get()
  async findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  // @Roles(Role.Admin, Role.Developer)
  async findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  @Put(':id')
  // @Roles(Role.Admin, Role.Developer)
  async update(@Param('id') id: string, @Body() updateRolesDto: UpdateRolesDto) {
    return this.rolesService.update(+id, updateRolesDto); 
  }

  @Delete(':id')
  // @Roles(Role.Admin, Role.Developer)
  async remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
