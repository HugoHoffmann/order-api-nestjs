import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthRequired } from 'modules/common/guards/token';
import { Order } from 'modules/database/models/order';

import { OrderService } from '../services/order';
import { ListValidator } from '../validators/order/list';
import { SaveValidator } from '../validators/order/save';
import { UpdateValidator } from '../validators/order/update';

@ApiTags('App: Order')
@Controller('/order')
@AuthRequired()
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get(':orderId')
  @ApiResponse({ status: 200, type: Order })
  public async show(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.orderService.findById(orderId);
  }

  @ApiResponse({ status: 200, type: Number })
  @Delete(':orderId')
  public async delete(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.orderService.remove(orderId);
  }

  @ApiResponse({ status: 200, type: Order })
  @Put(':orderId')
  public async update(@Param('orderId', ParseIntPipe) orderId: number, @Body() model: UpdateValidator) {
    return this.orderService.update({ id: orderId, ...model });
  }

  @Post()
  @ApiResponse({ status: 200, type: Order })
  public async save(@Body() model: SaveValidator) {
    return this.orderService.save(model);
  }

  @Get()
  @ApiResponse({ status: 200, type: [Order] })
  public async list(@Query() model: ListValidator) {
    return this.orderService.list(model);
  }
}
