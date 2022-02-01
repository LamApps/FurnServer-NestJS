import { Controller, Get, Post, Body, Put, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { EmailService } from './email.service';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { Role } from '../enum/role.enum';
import { Roles } from '../user/roles.decorator';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  // @Roles(Role.Admin, Role.Developer)
  async create(@Body() createEmailDto: CreateEmailDto) {
    return this.emailService.create(createEmailDto);
  }

  @Get('company/:company')
  @UsePipes(new ValidationPipe())
  // @Roles(Role.Admin, Role.Developer)
  async findAll(@Param('company') company: number) {
    return this.emailService.findAll(company);
  }

  @Get(':id')
  @UsePipes(new ValidationPipe())
  // @Roles(Role.Admin, Role.Developer)
  findOne(@Param('id') id: string) {
    return this.emailService.findOne(+id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  // @Roles(Role.Admin, Role.Developer)
  update(@Param('id') id: string, @Body() updateEmailDto: UpdateEmailDto) {
    return this.emailService.update(+id, updateEmailDto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  // @Roles(Role.Admin, Role.Developer)
  remove(@Param('id') id: string) {
    return this.emailService.remove(+id);
  }
}
