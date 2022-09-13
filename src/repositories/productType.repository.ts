import { BrandModel, CategoryModel, ProductTypeModel } from '../datasource/sequelize';
import { INewProductType, IProductType, IProductTypeFilter } from '../interface/productType.interface';
const { Op } = require('sequelize');
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

  async getTypCat(names: string[]) {
    const likesClause = ['TypName', 'BraName'].map(field => {
      return names.map((x: string) => {
        return { [field]: { [Op.like]: `%${x}%` } };
      });
    });
    const whereClause = {
      [Op.or]: likesClause[0],
      enabled: 1,
    };
    const res = await ProductTypeModel.findAll({
      attributes: ['TypId', 'TypName'],
      where: whereClause,
      include: [
        { model: CategoryModel, required: false },
        { model: BrandModel, required: false, where: { [Op.or]: likesClause[1] } },
      ],
      group: 'BraName',
    });
    return res;
  }

  async getById(TypId: number): Promise<IProductType> {
    return await ProductTypeModel.findOne({
      where: { TypId, enabled: true },
    });
  }
}

export const productTypeRepository = new ProductTypeRepository();
