import { ProductTypeModel } from '../datasource/sequelize';
import { INewProductType, IProductType, IProductTypeFilter } from '../interface/productType.interface';
import { productTypeModel } from '../models/productType.model';
class ProductTypeRepository {
  async get(filters: Partial<IProductTypeFilter>): Promise<IProductType[]> {
    let result: IProductType[];
    if (filters) {
      const whereClause: Partial<IProductTypeFilter> = { enabled: true };
      if (filters.TypCatId) {
        whereClause.TypCatId = filters.TypCatId;
      }
      if (filters.TypName) {
        whereClause.TypName = filters.TypName;
      }
      result = await ProductTypeModel.findAll({ where: whereClause });
    } else {
      result = await ProductTypeModel.findAll({ where: { enabled: true } });
    }

    return result;
  }

  async set(productType: INewProductType): Promise<IProductType> {
    return await ProductTypeModel.create(productType);
  }

  async getByCategory(TypCatId: number) {
    return await ProductTypeModel.findAll({
      where: { TypCatId, enabled: true },
    });
  }

  async del(TypId: number, userId: number) {
    const pt = await ProductTypeModel.findOne({ where: { TypId, enabled: true }, raw: true });
    if (pt) {
      pt.deletedAt = new Date();
      pt.enabled = false;
      pt.deletedUser = userId;
      return await ProductTypeModel.update(pt, { where: { TypId } });
    }
  }

  async getById(TypId: number): Promise<IProductType> {
    return await ProductTypeModel.findOne({
      where: { TypId, enabled: true },
    });
  }
}

export const productTypeRepository = new ProductTypeRepository();
