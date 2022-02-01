import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CompanyPasswordService } from './company-password.service';
import { CompanyPasswordController } from './company-password.controller';
import { CompanyModule } from '../company/company.module';
import { CompanyPasswordEntity } from './company-password.entity';
import { CompanyEntity } from '../company/company.entity';
import { PasswordEntity } from '../password/password.entity';
import { UserModule } from '../user/user.module';
import { AdminuserModule } from '../adminuser/adminuser.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from '../user/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyPasswordEntity, CompanyEntity, PasswordEntity]), UserModule, AdminuserModule],
  controllers: [CompanyPasswordController],
  providers: [CompanyPasswordService]
})
export class CompanyPasswordModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        {path: 'company_password/:id', method: RequestMethod.GET},
        {path: 'company_password/:id', method: RequestMethod.PUT},
        {path: 'company_password/:company/:id', method: RequestMethod.DELETE},
        {path: 'company_password', method: RequestMethod.POST},
        {path: 'company_password/company/:id', method: RequestMethod.GET}, 
        );
  }
}
