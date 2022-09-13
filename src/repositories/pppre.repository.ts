import { ProductPresentationPropertyModel, PrProPreModel } from '../datasource/sequelize';
import {
  INewProductPresentationProperty,
  IProductPresentationProperty,
  IProductPresentationPropertyFilter,
} from '../interface/productPresentationProperty.interface';

class PppreRepository {
  async get(filters?: Partial<IProductPresentationPropertyFilter>): Promise<IProductPresentationProperty[]> {
    let result: IProductPresentationProperty[];
    if (filters) {
      const whereClause: Partial<IProductPresentationPropertyFilter> = { enabled: true };
      if (filters.PreProId) {
        whereClause.PreProId = filters.PreProId;
      }
      if (filters.PreValId) {
        whereClause.PreValId = filters.PreValId;
      }
      result = await ProductPresentationPropertyModel.findAll({ where: whereClause });
    } else {
      result = await ProductPresentationPropertyModel.findAll({ where: { enabled: true } });
    }
    return result;
  }

  async getPrProPreByProdId(ProductId: number) {
    return PrProPreModel.findAll({ where: { ProductId } });
  }

  async getById(PreId: number): Promise<IProductPresentationProperty> {
    return await ProductPresentationPropertyModel.findOne({ where: { enabled: true, PreId } });
  }

  async getByProduct(PreProId: number): Promise<IProductPresentationProperty[]> {
    return await ProductPresentationPropertyModel.findAll({ where: { enabled: true, PreProId } });
  }

  async create(pre: INewProductPresentationProperty): Promise<IProductPresentationProperty> {
    return await ProductPresentationPropertyModel.create(pre);
  }

  async del(PreId: number, userId: number) {
    const pre = await ProductPresentationPropertyModel.findOne({ raw: true, where: { enabled: true, PreId } });
    pre.deletedAt = new Date();
    pre.deletedUser = userId;
    pre.enabled = false;

    return await ProductPresentationPropertyModel.update(pre, { where: { PreId } });
  }
}

export const pppreRepository = new PppreRepository();
