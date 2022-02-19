import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CompanyEntity } from '../../company/company.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from '../../user/auth.middleware';
import { ChatLogEntity } from './entities/chat-log.entity';
import { ChatContactEntity } from './entities/chat-contact.entity';
import { UserEntity } from '../../user/user.entity';
import { AdminuserEntity } from '../../adminuser/adminuser.entity';
import { PrivateService } from './private.service';
import { PrivateChatController } from './private.controller';
import { UserModule } from '../../user/user.module';
import { AdminuserModule } from '../../adminuser/adminuser.module';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity, ChatLogEntity,ChatContactEntity, UserEntity, AdminuserEntity]), UserModule, AdminuserModule],
  controllers: [PrivateChatController],
  providers: [PrivateService],
  exports: [PrivateService]
})
export class PrivateChatModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        {path: 'private/get-users', method: RequestMethod.GET},
        {path: 'private/get-contacts', method: RequestMethod.GET},
        {path: 'private/add-contacts/:id', method: RequestMethod.POST},
        {path: 'private/chat-log', method: RequestMethod.GET},
        {path: 'private/set-read', method: RequestMethod.GET},
        {path: 'private/get-unread-messages', method: RequestMethod.GET},
        {path: 'private/delete-contact', method: RequestMethod.GET},
        {path: 'private/delete-chat-log', method: RequestMethod.GET},
        {path: 'private/chat-log/:id', method: RequestMethod.GET},
        {path: 'private/chat-log/:id', method: RequestMethod.PUT},
        {path: 'private/chat-log/:id', method: RequestMethod.DELETE},
        {path: 'private/chat-log', method: RequestMethod.POST},
        {path: 'private/chat-log/verify', method: RequestMethod.POST},
      );
  }
}
