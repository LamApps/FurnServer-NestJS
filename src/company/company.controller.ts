import { Controller, Get, Post, Body, Put, Param, Delete, UsePipes, ValidationPipe, UseGuards, HttpCode, HttpException, HttpStatus } from '@nestjs/common';
import { Role } from '../enum/role.enum';
import { Roles } from '../user/roles.decorator';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @Roles(Role.Admin, Role.Developer)
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    return await this.companyService.create(createCompanyDto);
  }
  
  @Post('permission/:id')
  @Roles(Role.Admin, Role.Developer)
  async permission(@Param('id') id: string, @Body() dto) {
    return await this.companyService.updatePermission(+id, dto);
  }

  @Post('enable/:id')
  // @Roles(Role.Admin, Role.Developer)
  async enable(@Param('id') id: string, @Body() dto) {
    return await this.companyService.enable(+id, dto);
  }

  @Get()
  // @Roles(Role.Admin, Role.Developer)
  async findAll() {
    return await this.companyService.findAll();
  }

  @Get(':id')
  // @Roles(Role.Admin, Role.Developer)
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(+id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  // @Roles(Role.Admin, Role.Developer)
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(+id, updateCompanyDto);
  }

  @Delete(':id')
  // @Roles(Role.Admin, Role.Developer)
  remove(@Param('id') id: string) {
    return this.companyService.remove(+id);
  }
}
