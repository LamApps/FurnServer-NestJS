import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UuidService } from './uuid.service';
import { UuidController } from './uuid.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from '../company/company.entity';
import { UUIDEntity } from './uuid.entity';
import { AuthMiddleware } from '../user/auth.middleware';
import { UserModule } from '../user/user.module';
import { AdminuserModule } from '../adminuser/adminuser.module';

@Module({
  imports: [TypeOrmModule.forFeature([UUIDEntity, CompanyEntity]), UserModule, AdminuserModule],
  controllers: [UuidController],
  providers: [UuidService]
})
export class UuidModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        {path: 'uuid/:id', method: RequestMethod.GET},
        {path: 'uuid/:id', method: RequestMethod.PUT},
        {path: 'uuid/:id', method: RequestMethod.DELETE},
        {path: 'uuid', method: RequestMethod.POST},
        {path: 'uuid/company/:id', method: RequestMethod.GET}, 
        );
  }
}
