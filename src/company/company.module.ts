import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from './company.entity';
import { AuthMiddleware } from '../user/auth.middleware';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { AdminuserEntity } from '../adminuser/adminuser.entity';
import { AdminuserService } from '../adminuser/adminuser.service';
import { PasswordEntity } from '../password/password.entity';
import { EmailEntity } from '../email/email.entity';
import { RolesEntity } from '../roles/roles.entity';
import { CompanyRoleEntity } from '../company-role/company-role.entity';
import { RoleMenuEntity } from '../company-role/role-menu.entity';



@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity, UserEntity, PasswordEntity, EmailEntity, AdminuserEntity, RolesEntity, CompanyRoleEntity, RoleMenuEntity])],
  controllers: [CompanyController],
  providers: [CompanyService, UserService, AdminuserService]
})
export class CompanyModule  implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        {path: 'company', method: RequestMethod.GET},
        {path: 'company/:id', method: RequestMethod.PUT},
        {path: 'company', method: RequestMethod.POST},
        {path: 'company/enable/:id', method: RequestMethod.POST},
        {path: 'company/permission/:id', method: RequestMethod.POST},
        {path: 'company/:id', method: RequestMethod.DELETE},
        {path: 'company/:id', method: RequestMethod.GET},
      );
  }
}