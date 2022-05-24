import { ProductTypeModel } from '../datasource/sequelize';
import { INewProductType, IProductType } from '../interface/productType.interface';
class ProductTypeRepository {
  async get() {
    return await ProductTypeModel.findAll({ where: { enabled: true } });
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
    console.log(pt);
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
