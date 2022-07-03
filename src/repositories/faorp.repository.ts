import { OrderProductsModel } from '../datasource/sequelize';
import { INewOrderProduct, IOrderProduct, IOrderProductFilter } from '../interface/orderProduct.interface';
const { Op } = require('sequelize');

class FaorpRepository {
  async get(filter: Partial<IOrderProductFilter>): Promise<IOrderProduct[]> {
    const whereClause: any = { enabled: true };
    if (filter) {
      if (filter.OrpOrdId) {
        whereClause.OrpOrdId = filter.OrpOrdId;
      }
      if (filter.minPrice && filter.maxPrice) {
        whereClause.OrpPrice = { [Op.between]: [filter.minPrice, filter.maxPrice] };
      }
      if (filter.OrpState) {
        whereClause.OrpState = filter.OrpState;
      }
      if (filter.minQuantity && filter.maxQuantity) {
        whereClause.OrpQuantity = { [Op.between]: [filter.minQuantity, filter.maxQuantity] };
      }
      if (filter.OrpProId) {
        whereClause.OrpProId = filter.OrpProId;
      }
    }
    return await OrderProductsModel.findAll({ where: whereClause });
  }

  async getById(OrpId: number): Promise<IOrderProduct> {
    return await OrderProductsModel.findOne({ where: { OrpId } });
  }

  async create(faorp: INewOrderProduct) {
    return await OrderProductsModel.create(faorp);
  }
}

export const faorpRepository = new FaorpRepository();
