import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CompanyEntity } from '../company/company.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from '../user/auth.middleware';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { EmailEntity } from './email.entity';
import { UserModule } from '../user/user.module';
import { AdminuserModule } from '../adminuser/adminuser.module';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity, EmailEntity]), UserModule, AdminuserModule],
  controllers: [EmailController],
  providers: [EmailService]
})
export class EmailModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        {path: 'email/:id', method: RequestMethod.GET},
        {path: 'email/:id', method: RequestMethod.PUT},
        {path: 'email/:id', method: RequestMethod.DELETE},
        {path: 'email', method: RequestMethod.POST},
        {path: 'email/company/:id', method: RequestMethod.GET}, 
        );
  }
}
