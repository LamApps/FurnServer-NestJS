import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CompanyEntity } from '../company/company.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from '../user/auth.middleware';
import { CodeEntity } from './entities/code.entity';
import { CodeService } from './code.service';
import { CodeController } from './code.controller';
import { UserModule } from '../user/user.module';
import { AdminuserModule } from '../adminuser/adminuser.module';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity, CodeEntity]), UserModule, AdminuserModule],
  controllers: [CodeController],
  providers: [CodeService]
})
export class CodeModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        {path: 'code/:id', method: RequestMethod.GET},
        {path: 'code/:id', method: RequestMethod.PUT},
        {path: 'code/:id', method: RequestMethod.DELETE},
        {path: 'code', method: RequestMethod.POST},
        );
  }
}
