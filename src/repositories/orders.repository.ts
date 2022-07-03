import { OrderModel, OrderProductsModel, ProductModel } from '../datasource/sequelize';
import { IOrder, INewOrder, IOrderFilter } from '../interface';

class OrderRepository {
  async get(filters?: Partial<IOrderFilter>, fields?: string[]): Promise<IOrder[]> {
    const whereClause: Partial<IOrderFilter> = { enabled: true };
    let result: any;
    let include = [];
    if (fields) {
      if (fields.includes('FAORP')) {
        include = [
          {
            model: OrderProductsModel,
            attributes: ['OrpId', 'OrpProId', 'OrpQuantity', 'OrpPrice'],
            where: { enabled: true },

            include: fields.includes('PRPRO') ? [{ model: ProductModel, where: { enabled: true } }] : [],
          },
        ];
      }
    }
    if (filters) {
      if (filters.OrdState) {
        whereClause.OrdState = filters.OrdState;
      }
      if (filters.OrdId) {
        whereClause.OrdId = filters.OrdId;
      }
      if (filters.OrdUsrId) {
        whereClause.OrdUsrId = filters.OrdUsrId;
      }
      result = await OrderModel.findAll({ where: whereClause, include });
    } else {
      result = await OrderModel.findAll({ where: whereClause, include });
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
