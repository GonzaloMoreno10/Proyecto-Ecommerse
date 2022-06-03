import { OrderModel } from '../datasource/sequelize';
import { IOrder, INewOrder, IOrderFilter } from '../interface';

class OrderRepository {
  async get(filters?: Partial<IOrderFilter>): Promise<IOrder[]> {
    let result: any;
    if (filters) {
      const whereClause: Partial<IOrderFilter> = { enabled: true };
      if (filters.OrdState) {
        whereClause.OrdState = filters.OrdState;
      }
      if (filters.OrdUsrId) {
        whereClause.OrdUsrId = filters.OrdUsrId;
      }
      result = await OrderModel.findAll({ where: whereClause });
    } else {
      result = await OrderModel.findAll();
    }

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
