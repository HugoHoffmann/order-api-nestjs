import * as Knex from 'knex';
import { IOrder } from 'modules/database/interfaces/order';

export async function seed(knex: Knex): Promise<void> {
  const order: IOrder = {
    description: 'Sushi',
    amount: 5,
    value: 1.25,
    createdDate: new Date(),
    updatedDate: new Date()
  };

  const users = await knex
    .count()
    .from('Order')
    .first();

  if (Number(users.count) > 0) return;

  await knex.insert(order).into('Order');
}
