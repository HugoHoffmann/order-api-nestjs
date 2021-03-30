export interface IOrder {
  id?: number;
  description: string;
  amount: number;
  value: number;

  createdDate?: Date;
  updatedDate?: Date;
}
