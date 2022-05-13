import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CompanyEntity } from '../../company/company.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from '../../user/auth.middleware';
import { RoomsEntity } from './entities/room.entity';
import { RoomBannedUsersEntity } from './entities/room_banned_users';
import { RoomLogEntity } from './entities/room-log.entity';
import { UserEntity } from '../../user/user.entity';
import { AdminuserEntity } from '../../adminuser/adminuser.entity';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { UserModule } from '../../user/user.module';
import { AdminuserModule } from '../../adminuser/adminuser.module';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity, RoomsEntity, RoomBannedUsersEntity,RoomLogEntity, UserEntity, AdminuserEntity]), UserModule, AdminuserModule],
  controllers: [RoomsController],
  providers: [RoomsService],
  exports: [RoomsService]
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
        {path: 'rooms/get-banned/:id', method: RequestMethod.GET},
        {path: 'rooms/remove-banned/:id', method: RequestMethod.GET},
        {path: 'rooms/log/:id', method: RequestMethod.GET},
      );
  }
}
