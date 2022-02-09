import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { CodeService } from './code.service';
import { CreateCodeDto } from './dto/create-code.dto';
import { UpdateCodeDto } from './dto/update-code.dto';

@Controller('code')
export class CodeController {
  constructor(private readonly codeService: CodeService) {}

  @Post()
  create(@Body() createCodeDto: CreateCodeDto) {
    return this.codeService.create(createCodeDto);
  }

  @Get()
  findAll(@Query('company') company: number) {
    return this.codeService.findAll(company);
  }

  @Get('active')
  findActiveList() {
    return this.codeService.findActiveList();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.codeService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCodeDto: UpdateCodeDto) {
    return this.codeService.update(+id, updateCodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.codeService.remove(+id);
  }
}
