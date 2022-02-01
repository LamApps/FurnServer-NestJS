import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompanyMenuService } from './company-menu.service';
import { CreateCompanyMenuDto } from './dto/create-company-menu.dto';
import { UpdateCompanyMenuDto } from './dto/update-company-menu.dto';

@Controller('company-menu')
export class CompanyMenuController {
  constructor(private readonly companyMenuService: CompanyMenuService) {}

  @Get('company/:company')
  async findAll(@Param('company') company: number) {
    return this.companyMenuService.findAll(+company);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyMenuService.findOne(+id);
  }
}
