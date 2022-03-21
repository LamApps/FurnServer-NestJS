import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { RolesModule } from './roles/roles.module';
import { AdminuserModule } from './adminuser/adminuser.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ProfileModule } from './profile/profile.module';
import { TagModule } from './tag/tag.module';
import { ScreenModule } from './screen/screen.module';
import { CompanyModule } from './company/company.module';
import { DeviceModule } from './device/device.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './user/roles.guard';
import { UuidModule } from './uuid/uuid.module';
import { AppsModule } from './apps/apps.module';
import { PasswordModule } from './password/password.module';
import { CategoryModule } from './category/category.module';
import { OptionModule } from './option/option.module';
import { CompanyPasswordModule } from './company-password/company-password.module';
import { EmailModule } from './email/email.module';
import { ApiModule } from './api/api.module';
import { QrcodeModule } from './qrcode/qrcode.module';
import { MenuModule } from './menu/menu.module';
import { getMetadataArgsStorage } from 'typeorm';

import { MailerModule } from '@nestjs-modules/mailer';
import { CompanyMenuModule } from './company-menu/company-menu.module';
import { CompanyRoleModule } from './company-role/company-role.module';
import { UtilsModule } from './utils/utils.module';
import { CodeModule } from './code/code.module';
import { ChatModule } from './chat/chat.module';
import { SalesOrderModule } from './furnserve/sales/sales-order/sales-order.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      // password: "Spurlock26!",
      password: "",
      database: "furnserve",
      // database: "invoice",
      // entities: ["src/**/**.entity{.ts,.js}"],
      entities: getMetadataArgsStorage().tables.map(tbl => tbl.target),
      synchronize: true
    }),
    UserModule,
    AdminuserModule,
    RolesModule,
    ProfileModule,
    TagModule,
    ScreenModule,
    CompanyModule,
    DeviceModule,
    UuidModule,
    PasswordModule,
    CategoryModule,
    OptionModule,
    AppsModule,
    CompanyPasswordModule,
    EmailModule,
    ApiModule,
    QrcodeModule,
    MenuModule,
    MailerModule.forRoot({
      transport: {
        host: "furnserve.email",
        port: 465,
        secure: true,
        auth: {
            user: "invoice@furnserve.email",
            pass: "Spurlock26!"
        },
        tls: {
          rejectUnauthorized:false
        }
      }
    }),
    CompanyMenuModule,
    CompanyRoleModule,
    UtilsModule,
    CodeModule,
    ChatModule,
    SalesOrderModule,
  ],
  controllers: [
    AppController
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ]
})
export class ApplicationModule {
  constructor(private readonly connection: Connection) {}
}
