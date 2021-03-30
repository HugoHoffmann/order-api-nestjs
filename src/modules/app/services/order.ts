import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { IPaginationParams } from 'modules/common/interfaces/pagination';
import { IOrder } from 'modules/database/interfaces/order';
import { Order } from 'modules/database/models/order';
import { Page } from 'objection';

import { OrderRepository } from '../repositories/order';

@Injectable()
export class OrderService {
  constructor(private orderRepository: OrderRepository) {}

  public async update(model: IOrder): Promise<Order> {
    await this.checkOrderExist(model.id);
    return this.orderRepository.update({ ...model });
  }

  public async findById(id: number): Promise<Order> {
    return this.checkOrderExist(id);
  }

  public async remove(id: number): Promise<number> {
    await this.checkOrderExist(id);
    return this.orderRepository.remove(id);
  }

  public async list(params: IPaginationParams): Promise<Page<Order>> {
    return this.orderRepository.list(params);
  }

  public async save(model: IOrder): Promise<Order> {
    const order = await this.orderRepository.findById(model.id);

    if (order) {
      return this.orderRepository.update({ ...order, ...model });
    }

    return this.orderRepository.insert(model);
  }

  private async checkOrderExist(id: number) {
    const order = await this.orderRepository.findById(id);
    if (!order) {
      throw new NotFoundException('Order id does not exist');
    }
    return order;
  }
}
