import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { PrivateService } from './private.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Controller('private')
export class PrivateChatController {
  constructor(private readonly privateService: PrivateService) {}

  @Get('get-users')
  getAllUsers(@Query('id') id: number, @Query('f') f: boolean, @Query('slug') slug: string) {
    return this.privateService.getAllUsers(id, f, slug);
  }

  @Get('get-contacts')
  getContacts(@Query('id') id: number, @Query('f') f: boolean) {
    return this.privateService.getContacts(id, f);
  }

  @Post('add-contacts/:id')
  addContact(@Param('id') id: number, @Body() contact: CreateContactDto) {
    return this.privateService.addContact(+id, contact);
  }

  @Get('chat-log')
  getChatLog(@Query('myid') myId: number, @Query('myf') myFlag: boolean, @Query('yourid') yourId: number, @Query('yourf') yourFlag: boolean) {
    return this.privateService.getChatLog(myId, myFlag, yourId, yourFlag);
  }

  @Get('set-read')
  setReadMessage(@Query('myid') myId: number, @Query('myf') myFlag: boolean, @Query('yourid') yourId: number, @Query('yourf') yourFlag: boolean) {
    return this.privateService.setReadMessage(myId, myFlag, yourId, yourFlag);
  }

  @Get('get-unread-messages')
  getUnreadMessages(@Query('myid') myId: number, @Query('myf') myFlag: boolean) {
    return this.privateService.getUnreadMessages(myId, myFlag);
  }

  @Get('delete-contact')
  deleteContact(@Query('contactId') contactId: number) {
    return this.privateService.deleteContact(contactId);
  }

  @Get('delete-chat-log')
  deleteChatLog(@Query('myid') myId: number, @Query('myf') myFlag: boolean, @Query('yourid') yourId: number, @Query('yourf') yourFlag: boolean) {
    return this.privateService.deleteChatLog(myId, myFlag, yourId, yourFlag);
  }

  @Get('public/:id')
  findPublicOne(@Param('id') id: string) {
    return this.privateService.findPublicOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.privateService.remove(+id);
  }
}
