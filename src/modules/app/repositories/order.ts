import { Injectable } from '@nestjs/common';
import { IOrder } from 'modules/database/interfaces/order';
import { Order } from 'modules/database/models/order';
import { Transaction } from 'objection';

@Injectable()
export class OrderRepository {
  public async findById(id: number, transaction?: Transaction): Promise<Order> {
    return Order.query(transaction).findById(id);
  }

  public async update(model: IOrder, transaction?: Transaction): Promise<Order> {
    return Order.query(transaction).updateAndFetchById(model.id, model as any);
  }

  public async insert(model: IOrder, transaction: Transaction = null): Promise<Order> {
    return Order.query(transaction).insertAndFetch(model as any);
  }

  public async remove(id: number, transaction?: Transaction): Promise<number> {
    return Order.query(transaction).deleteById(id);
  }

  public async findAll(transaction?: Transaction): Promise<Order[]> {
    return Order.query(transaction);
  }
}
