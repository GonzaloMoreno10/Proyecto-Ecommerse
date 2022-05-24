import { BrandModelLineModel } from '../datasource/sequelize';
import { INewBrandModelLine, IBrandModelLine } from '../interface/brandModelLine.interface';

class BrandModelLineRepository {
  async get(): Promise<IBrandModelLine[]> {
    return await BrandModelLineModel.findAll();
  }

  async getById(id: number): Promise<IBrandModelLine> {
    return await BrandModelLineModel.findOne({ where: { BmlId: id } });
  }

  async set(mmm: INewBrandModelLine): Promise<IBrandModelLine> {
    return await BrandModelLineModel.create(mmm);
  }

  async upd(bml: IBrandModelLine, BmlId: number) {
    return await BrandModelLineModel.update(bml, { where: { BmlId } });
  }

  async del(BmlId: number, userId: number) {
    const bml = await BrandModelLineModel.findOne({ where: { BmlId }, raw: true });
    if (bml) {
      bml.enabled = false;
      bml.deletedAt = new Date();
      bml.deletedUser = userId;

      return await BrandModelLineModel.update(bml, { where: { BmlId } });
    }
  }
}

export const brandModelLineRepository = new BrandModelLineRepository();
