import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { VerifyRoomDto } from './dto/verify.dto';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }
  @Post('verify')
  verify(@Body() verifyRoomDto: VerifyRoomDto) {
    return this.roomsService.verify(verifyRoomDto);
  }

  @Get('get-banned/:id')
  getBannedUsers(@Param('id') id: number) {
    return this.roomsService.getBannedUsers(+id);
  }

  @Get('remove-banned/:id')
  removeBannedUsers(@Param('id') id: number) {
    return this.roomsService.removeBannedUsers(+id);
  }

  @Get()
  findAll(@Query('company') company: number) {
    return this.roomsService.findAll(company);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(+id);
  }

  @Get('public/:id')
  findPublicOne(@Param('id') id: string) {
    return this.roomsService.findPublicOne(+id);
  }

  @Get('log/:id')
  getLog(@Param('id') id: string) {
    return this.roomsService.getLog(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(+id, updateRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomsService.remove(+id);
  }
}
