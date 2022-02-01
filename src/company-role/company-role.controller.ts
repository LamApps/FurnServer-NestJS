import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ValidationPipe, UsePipes } from '@nestjs/common';
import { CompanyRoleService } from './company-role.service';
import { CreateCompanyRoleDto } from './dto/create-company-role.dto';
import { UpdateCompanyRoleDto } from './dto/update-company-role.dto';

@Controller('company-role')
export class CompanyRoleController {
  constructor(private readonly companyRoleService: CompanyRoleService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createCompanyRoleDto: CreateCompanyRoleDto) {
    return await this.companyRoleService.create(createCompanyRoleDto);
  }

  @Get('company/:id')
  async findAll(@Param('id') id: string) {
    return await this.companyRoleService.findAll(+id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.companyRoleService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCompanyRoleDto: UpdateCompanyRoleDto) {
    return await this.companyRoleService.update(+id, updateCompanyRoleDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.companyRoleService.remove(+id);
  }
}
