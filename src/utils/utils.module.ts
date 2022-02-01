import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { UtilsController } from './utils.controller';
import { AuthMiddleware } from '../user/auth.middleware';
import { BackupEntity } from './backup.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminuserModule } from '../adminuser/adminuser.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([BackupEntity]), UserModule, AdminuserModule],
  controllers: [UtilsController],
  providers: [UtilsService]
})

export class UtilsModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        {path: 'utils/backup', method: RequestMethod.POST},
        {path: 'utils/backup', method: RequestMethod.GET},
        {path: 'utils/backup/:id', method: RequestMethod.GET},
        {path: 'utils/backup/:id', method: RequestMethod.DELETE},
      );
  }
}
