import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SalesOrderService } from './sales-order.service';
import { searchDto } from './dto/search-sales-order.dto';
import { detailsDto } from './dto/details-sales-order.dto';

@Controller('sales-order')
export class SalesOrderController {
  constructor(
    private readonly salesOrderService: SalesOrderService,
    ) {}

  @Post('search')
  search(@Body() search: searchDto) {
    return this.salesOrderService.search(search);
  }

  @Post('get-detail')
  getDetail(@Body() details: detailsDto) {
    return this.salesOrderService.getDetail(details);
  }

}
