import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ScreenService } from './screen.service';
import { ScreenController } from './screen.controller';
import { AuthMiddleware } from '../user/auth.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { UserModule } from '../user/user.module';
import { ScreenEntity } from './screen.entity';
import { MulterModule } from '@nestjs/platform-express';
import { FileMiddleware } from './file.middleware';
import { imageFileFilter } from './file.util';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, ScreenEntity]),
    MulterModule.register({
      dest: './uploads',
      fileFilter: imageFileFilter
    }),
    UserModule
  ],
  providers: [ScreenService],
  controllers: [ScreenController]
})
export class ScreenModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      // .apply(AuthMiddleware)
      // .forRoutes({path: 'screens/:id', method: RequestMethod.GET})
      .apply(FileMiddleware)
      .forRoutes({path: 'screens/upload', method: RequestMethod.POST});
  }  
}
