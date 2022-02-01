import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { AuthMiddleware } from '../adminuser/auth.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesEntity } from './roles.entity';
import { AdminuserService } from '../adminuser/adminuser.service';
import { AdminuserEntity } from '../adminuser/adminuser.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RolesEntity, AdminuserEntity])],
  controllers: [RolesController],
  providers: [RolesService, AdminuserService]
})
export class RolesModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        {path: 'roles', method: RequestMethod.GET},
        {path: 'roles/:id', method: RequestMethod.PUT},
        {path: 'roles', method: RequestMethod.POST},
        {path: 'roles/:id', method: RequestMethod.DELETE},
        {path: 'roles/:id', method: RequestMethod.GET},
      );
  }
}