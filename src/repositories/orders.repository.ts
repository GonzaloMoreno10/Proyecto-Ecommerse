import { OrderModel } from '../datasource/sequelize';
import { IOrder, INewOrder } from '../interface';

class OrderRepository {
  async get(): Promise<IOrder[]> {
    const result = await OrderModel.findAll();
    return <IOrder[]>(<unknown>result);
  }

  async getByUser(OrdUsrId: number): Promise<IOrder[]> {
    const result = await OrderModel.findAll({
      where: { OrdUsrId },
    });
    return <IOrder[]>(<unknown>result);
  }
  async getById(OrdId: number): Promise<IOrder> {
    const result = await OrderModel.findOne({ where: { OrdId } });
    return <IOrder>(<unknown>result);
  }

  async set(order: INewOrder) {
    return await OrderModel.create(order);
  }
}

export const orderRepository = new OrderRepository();
