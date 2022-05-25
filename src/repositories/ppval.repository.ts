import { ProductPropertyValueModel } from '../datasource/sequelize';
import { INewProductPropertyValue, IProductPropertyValue } from '../interface/productPropertyValue.interface';

class PpvalRepository {
  async get(): Promise<IProductPropertyValue[]> {
    return await ProductPropertyValueModel.findAll({ where: { enabled: true } });
  }

  async getById(ValId: number): Promise<IProductPropertyValue> {
    return await ProductPropertyValueModel.findOne({ where: { ValId, enabled: true } });
  }

  async set(ppval: INewProductPropertyValue): Promise<IProductPropertyValue> {
    return await ProductPropertyValueModel.create(ppval);
  }

  async del(ValId: number, userId) {
    const ppval = await ProductPropertyValueModel.findOne({ where: { ValId }, raw: true });
    ppval.enabled = false;
    ppval.deletedAt = new Date();
    ppval.deletedUser = userId;

    return await ProductPropertyValueModel.update(ppval, { where: { ValId } });
  }
}
export const ppvalRepository = new PpvalRepository();
