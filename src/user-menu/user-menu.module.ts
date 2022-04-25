import { Module } from '@nestjs/common';
import { UserMenuService } from './user-menu.service';
import { UserMenuController } from './user-menu.controller';

@Module({
  controllers: [UserMenuController],
  providers: [UserMenuService]
})
export class UserMenuModule {}
