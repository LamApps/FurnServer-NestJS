import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';
import { AdminuserEntity } from '../adminuser/adminuser.entity';
import { AdminuserService } from '../adminuser/adminuser.service';
import { RolesEntity } from '../roles/roles.entity';
import { CompanyEntity } from '../company/company.entity';
import { AppsService } from './apps.service';
import { AppsEntity } from './apps.entity';
import { AppsController } from './apps.controller';
import { AuthMiddleware } from '../user/auth.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AppsEntity, UserEntity, CompanyEntity, AdminuserEntity, RolesEntity])],
  controllers: [AppsController],
  providers: [AppsService, UserService, AdminuserService]
})
export class AppsModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        {path: 'apps', method: RequestMethod.GET},
        {path: 'apps/:id', method: RequestMethod.PUT},
        {path: 'apps', method: RequestMethod.POST},
        {path: 'apps/:id', method: RequestMethod.DELETE},
        {path: 'apps/:id', method: RequestMethod.GET},
      );
  }
}
