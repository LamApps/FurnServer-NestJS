import { Controller, Get, Post, Body, Put, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppsService } from './apps.service';
import { CreateAppsDto } from './dto/create-apps.dto';
import { UpdateAppsDto } from './dto/update-apps.dto';

@Controller('apps')
export class AppsController {
  constructor(private readonly appsService: AppsService) {}

  @Post()
  async create(@Body() createAppsDto: CreateAppsDto) {
    return this.appsService.create(createAppsDto);
  }

  @Get()
  async findAll() { 
    return this.appsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.appsService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateAppsDto: UpdateAppsDto) {
    return this.appsService.update(+id, updateAppsDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.appsService.remove(+id);
  }
}
