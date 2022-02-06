import { Controller, Get, Post, Body, Put, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { UuidService } from './uuid.service';
import { CreateUuidDto } from './dto/create-uuid.dto';
import { UpdateUuidDto } from './dto/update-uuid.dto';
import { Role } from '../enum/role.enum';
import { Roles } from '../user/roles.decorator';

@Controller('uuid')
export class UuidController {
  constructor(private readonly uuidService: UuidService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  // @Roles(Role.Admin, Role.Developer)
  async create(@Body() createUuidDto: CreateUuidDto) {
    return this.uuidService.create(createUuidDto);
  }

  @Get('company/:company')
  // @Roles(Role.Admin, Role.Developer)
  async findAll(@Param('company') company: number) {
    return this.uuidService.findAll(+company);
  }

  @Get('getUid')
  async getLatestUniqueId() {
    return this.uuidService.getLatestUniqueId();
  }

  @Get(':id')
  // @Roles(Role.Admin, Role.Developer)
  findOne(@Param('id') id: string) {
    return this.uuidService.findOne(+id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  // @Roles(Role.Admin, Role.Developer)
  update(@Param('id') id: string, @Body() updateUuidDto: UpdateUuidDto) {
    return this.uuidService.update(+id, updateUuidDto);
  }

  @Delete(':id')
  // @Roles(Role.Admin, Role.Developer)
  remove(@Param('id') id: string) {
    return this.uuidService.remove(+id);
  }
}
