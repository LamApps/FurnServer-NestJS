import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CompanyEntity } from '../../company/company.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from '../../user/auth.middleware';
import { RoomsEntity } from './entities/room.entity';
import { UserEntity } from '../../user/user.entity';
import { AdminuserEntity } from '../../adminuser/adminuser.entity';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { UserModule } from '../../user/user.module';
import { AdminuserModule } from '../../adminuser/adminuser.module';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity, RoomsEntity, UserEntity, AdminuserEntity]), UserModule, AdminuserModule],
  controllers: [RoomsController],
  providers: [RoomsService]
})
export class RoomsModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        {path: 'rooms', method: RequestMethod.GET},
        {path: 'rooms/:id', method: RequestMethod.GET},
        {path: 'rooms/:id', method: RequestMethod.PUT},
        {path: 'rooms/:id', method: RequestMethod.DELETE},
        {path: 'rooms', method: RequestMethod.POST},
        {path: 'rooms/verify', method: RequestMethod.POST},
      );
  }
}
