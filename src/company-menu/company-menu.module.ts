import { Module } from '@nestjs/common';
import { CompanyMenuService } from './company-menu.service';
import { CompanyMenuController } from './company-menu.controller';

@Module({
  controllers: [CompanyMenuController],
  providers: [CompanyMenuService]
})
export class CompanyMenuModule {}
