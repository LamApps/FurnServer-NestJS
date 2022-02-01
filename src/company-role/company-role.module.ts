import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CompanyRoleService } from './company-role.service';
import { CompanyRoleController } from './company-role.controller';
import { AuthMiddleware } from '../user/auth.middleware';
import { CompanyRoleEntity } from './company-role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { AdminuserModule } from '../adminuser/adminuser.module';
import { RoleMenuEntity } from './role-menu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyRoleEntity, RoleMenuEntity]), UserModule, AdminuserModule],
  controllers: [CompanyRoleController],
  providers: [CompanyRoleService]
})
export class CompanyRoleModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        {path: 'company-role', method: RequestMethod.POST},
        {path: 'company-role/:id', method: RequestMethod.PUT},
        {path: 'company-role/company/:id', method: RequestMethod.GET},
        {path: 'company-role/:id', method: RequestMethod.DELETE},
        {path: 'company-role/:id', method: RequestMethod.GET},
      );
  }
}