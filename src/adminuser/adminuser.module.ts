import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import { AdminuserController } from './adminuser.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminuserEntity } from './adminuser.entity';
import { AdminuserService } from './adminuser.service';
import { AuthMiddleware } from './auth.middleware';
import { RolesEntity } from '../roles/roles.entity';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [TypeOrmModule.forFeature([AdminuserEntity, RolesEntity]), RolesModule],
  providers: [AdminuserService],
  controllers: [
    AdminuserController
  ],
  exports: [AdminuserService]
})

export class AdminuserModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        {path: 'adminuser/:id', method: RequestMethod.GET},
        {path: 'adminuser/:id', method: RequestMethod.PUT},
        {path: 'adminuser/:id', method: RequestMethod.DELETE},
        {path: 'adminuser', method: RequestMethod.POST},
        {path: 'uploadPhoto', method: RequestMethod.POST},
        {path: 'adminuser', method: RequestMethod.GET}, 
        );
  }
}
