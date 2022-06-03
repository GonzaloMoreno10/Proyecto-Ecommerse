import { ProductPresentationPropertyModel } from '../datasource/sequelize';
import {
  INewProductPresentationProperty,
  IProductPresentationProperty,
} from '../interface/productPresentationProperty.interface';

class PppreRepository {
  async get(): Promise<IProductPresentationProperty[]> {
    return await ProductPresentationPropertyModel.findAll({ where: { enabled: true } });
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
