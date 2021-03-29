import { Injectable } from '@nestjs/common';
import { IOrder } from 'modules/database/interfaces/order';
import { Order } from 'modules/database/models/order';

import { OrderRepository } from '../repositories/order';

@Injectable()
export class OrderService {
  constructor(private orderRepository: OrderRepository) {}

  public async update(model: IOrder): Promise<Order> {
    delete model.id;
    return this.orderRepository.update({ ...model, ...model });
  }

  public async findById(id: number): Promise<Order> {
    return this.orderRepository.findById(id);
  }

  public async delete(id: number): Promise<number> {
    return this.orderRepository.remove(id);
  }

  public async findAll(): Promise<Order[]> {
    return this.orderRepository.findAll();
  }

  public async save(model: IOrder): Promise<Order> {
    const order = await this.orderRepository.findById(model.id);

    if (order) {
      return this.orderRepository.update({ ...order, ...model });
    }

    return this.orderRepository.insert(model);
  }
}
