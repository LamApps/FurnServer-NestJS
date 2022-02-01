import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordEntity } from '../password/password.entity';
import { CompanyEntity } from '../company/company.entity';
import { CompanyPasswordEntity } from '../company-password/company-password.entity';
import { UUIDEntity } from '../uuid/uuid.entity';
import { QrcodeEntity } from '../qrcode/qrcode.entity';
import { RolesEntity } from '../roles/roles.entity';
import { AdminuserEntity } from '../adminuser/adminuser.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PasswordEntity, CompanyPasswordEntity, CompanyEntity, UUIDEntity, QrcodeEntity, AdminuserEntity, RolesEntity])],
  controllers: [ApiController],
  providers: [ApiService]
})
export class ApiModule {}
