import { MiddlewareConsumer, Module, Request, RequestMethod } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuEntity } from './menu.entity';
import { CompanyEntity } from '../company/company.entity';
import { CompanyMenuEntity } from '../company-menu/company-menu.entity';
import { CompanyRoleEntity } from '../company-role/company-role.entity';
import { RoleMenuEntity } from '../company-role/role-menu.entity';

import { AuthMiddleware } from '../user/auth.middleware';
import { UserModule } from '../user/user.module';
import { AdminuserModule } from '../adminuser/adminuser.module';

@Module({
  imports: [TypeOrmModule.forFeature([MenuEntity, CompanyEntity, CompanyMenuEntity, CompanyRoleEntity, RoleMenuEntity]), UserModule, AdminuserModule],
  controllers: [MenuController],
  providers: [MenuService]
})
export class MenuModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        {path: 'menu/:id', method: RequestMethod.GET},
        {path: 'menu/:id', method: RequestMethod.PUT},
        {path: 'menu/:id', method: RequestMethod.DELETE},
        {path: 'menu', method: RequestMethod.POST},
      );
  }
}
