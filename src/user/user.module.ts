import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { AuthMiddleware } from './auth.middleware';
import { CompanyEntity } from '../company/company.entity';
import { CompanyModule } from '../company/company.module';
import { UuidModule } from '../uuid/uuid.module';
import { AdminuserService } from '../adminuser/adminuser.service';
import { AdminuserModule } from '../adminuser/adminuser.module';
import { AdminuserEntity } from '../adminuser/adminuser.entity';
import { RolesService } from '../roles/roles.service';
import { RolesModule } from '../roles/roles.module';
import { RolesEntity } from '../roles/roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, CompanyEntity, AdminuserEntity, RolesEntity]), CompanyModule, AdminuserModule, RolesModule],
  providers: [UserService, AdminuserService, RolesService],
  controllers: [
    UserController
  ],
  exports: [UserService]
})

export class UserModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        {path: 'user/:id', method: RequestMethod.GET},
        {path: 'user/:id', method: RequestMethod.PUT},
        {path: 'user/:id', method: RequestMethod.DELETE},
        {path: 'user/permission/:id', method: RequestMethod.POST},
        {path: 'user', method: RequestMethod.POST},
        {path: 'uploadPhoto', method: RequestMethod.POST},
        {path: 'user', method: RequestMethod.GET}, 
      );
  }
}
