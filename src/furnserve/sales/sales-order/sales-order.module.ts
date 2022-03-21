import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SalesOrderService } from './sales-order.service';
import { SalesOrderController } from './sales-order.controller';

@Module({
  imports: [HttpModule],
  controllers: [SalesOrderController],
  providers: [SalesOrderService]
})
export class SalesOrderModule {}
