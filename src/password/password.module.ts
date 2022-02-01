import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { PasswordService } from './password.service';
import { PasswordController } from './password.controller';
import { AuthMiddleware } from '../user/auth.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordEntity } from './password.entity';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';
import { CompanyEntity } from '../company/company.entity';
import { AdminuserEntity } from '../adminuser/adminuser.entity';
import { AdminuserService } from '../adminuser/adminuser.service';
import { RolesEntity } from '../roles/roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PasswordEntity, UserEntity, CompanyEntity, AdminuserEntity, RolesEntity])],
  controllers: [PasswordController],
  providers: [PasswordService, UserService, AdminuserService]
})
export class PasswordModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        {path: 'password', method: RequestMethod.GET},
        {path: 'password/:id', method: RequestMethod.PUT},
        {path: 'password', method: RequestMethod.POST},
        {path: 'password/:id', method: RequestMethod.DELETE},
        {path: 'password/:id', method: RequestMethod.GET},
      );
  }
}