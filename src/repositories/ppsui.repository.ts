import { ProductPropertySubItemModel } from '../datasource/sequelize';
import { IProductPropertySubItem } from '../interface/productPropertySubItem.interface';

class PpsuiRepository {
  async get(): Promise<IProductPropertySubItem[]> {
    return await ProductPropertySubItemModel.findAll({ where: { enabled: true } });
  }

  async getById(SuiId: number): Promise<IProductPropertySubItem> {
    return await ProductPropertySubItemModel.findOne({ where: { SuiId, enabled: true } });
  }

  async set(sui: IProductPropertySubItem): Promise<IProductPropertySubItem> {
    return await ProductPropertySubItemModel.create(sui);
  }

  async del(SuiId: number, userId: number) {
    const sui = await ProductPropertySubItemModel.findOne({ where: { SuiId, enabled: true }, raw: true });
    if (sui) {
      sui.deletedAt = new Date();
      sui.deletedUser = userId;
      sui.enabled = false;

      return await ProductPropertySubItemModel.update(sui, { where: { SuiId } });
    }
  }
}

export const ppsuiRepository = new PpsuiRepository();
