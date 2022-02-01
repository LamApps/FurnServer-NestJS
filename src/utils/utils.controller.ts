import { Controller, Get, Post, Body, Patch, Param, Delete, Res, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Role } from '../enum/role.enum';
import { Roles } from '../user/roles.decorator';
import { UtilsService } from './utils.service';

@Controller('utils')
export class UtilsController {
  constructor(private readonly utilsService: UtilsService) {}

  @Post('backup')
  @Roles(Role.Admin, Role.Developer)
  async backup() {
    return await this.utilsService.backup();
  }

  @Get('backup')
  @Roles(Role.Admin, Role.Developer)
  async findAllBackup() {
    return await this.utilsService.findAll();
  }

  @Get('backup/:id') 
  @Roles(Role.Admin, Role.Developer)
  async findBackup(@Param('id') id: string, @Res() res) {
    const backup = await this.utilsService.findOne(+id);
    const filename = join(process.cwd(), './backup_furnserve/' + backup.item.filename);
    return res.download(filename);
  }

  @Delete('backup/:id')
  @Roles(Role.Admin, Role.Developer)
  remove(@Param('id') id: string) {
    return this.utilsService.remove(+id);
  }
}
