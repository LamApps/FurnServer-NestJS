import { MiddlewareConsumer, Module, Request, RequestMethod } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationEntity } from './entities/location.entity';
import { CompanyEntity } from '../../../company/company.entity';

import { AuthMiddleware } from '../../../user/auth.middleware';
import { UserModule } from '../../../user/user.module';
import { AdminuserModule } from '../../../adminuser/adminuser.module';

@Module({
  imports: [TypeOrmModule.forFeature([LocationEntity, CompanyEntity]), UserModule, AdminuserModule],
  controllers: [LocationsController],
  providers: [LocationsService]
})
export class LocationsModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        {path: ':id', method: RequestMethod.GET},
        {path: ':id', method: RequestMethod.PUT},
        {path: ':id', method: RequestMethod.DELETE},
        {path: '', method: RequestMethod.POST},
      );
  }
}
