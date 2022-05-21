import { OrderModel, OrderProductsModel } from '../datasource/sequelize';
import { INewOrder, IOrderRelation } from '../interface';

class OrderRepository {
  async getOrders(): Promise<any[]> {
    return await OrderModel.findAll();
  }

  async getOrdersByUser(OrdUsrId: number): Promise<IOrderRelation[]> {
    const result = await OrderModel.findAll({
      where: { OrdUsrId },
      include: [{ model: OrderProductsModel, required: true }],
    });
    return <IOrderRelation[]>(<unknown>result);
  }
  async getOrderById(OrdId: number) {
    return await OrderModel.findOne({ where: { OrdId } });
  }

  async setOrder(order: INewOrder) {
    return await OrderModel.create(order);
  }
}

export const orderRepository = new OrderRepository();
