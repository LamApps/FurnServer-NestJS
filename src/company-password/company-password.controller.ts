import { Controller, Get, Post, Body, Put, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { CompanyPasswordService } from './company-password.service';
import { CreateCompanyPasswordDto } from './dto/create-company-password.dto';
import { UpdateCompanyPasswordDto } from './dto/update-company-password.dto';

@Controller('company-password')
export class CompanyPasswordController {
  constructor(private readonly companyPasswordService: CompanyPasswordService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createCompanyPasswordDto: CreateCompanyPasswordDto) {
    return this.companyPasswordService.create(createCompanyPasswordDto);
  }

  @Get('company/:company')
  async findAll(@Param('company') company: number) {
    return this.companyPasswordService.findAll(+company);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.companyPasswordService.findOne(+id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: string, @Body() updateCompanyPasswordDto: UpdateCompanyPasswordDto) {
    return this.companyPasswordService.update(+id, updateCompanyPasswordDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.companyPasswordService.remove(+id);
  }

}
