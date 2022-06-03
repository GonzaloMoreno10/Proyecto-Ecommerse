import { BrandModelLineModel } from '../datasource/sequelize';
import { INewBrandModelLine, IBrandModelLine, IBrandModelLineFilter } from '../interface/brandModelLine.interface';

class BrandModelLineRepository {
  async get(filter: Partial<IBrandModelLineFilter>): Promise<IBrandModelLine[]> {
    let result: IBrandModelLine[];
    if (filter) {
      const whereClause: Partial<IBrandModelLineFilter> = { enabled: true };
      if (filter.BmlBraId) {
        whereClause.BmlBraId = filter.BmlBraId;
      }
      if (filter.BmlLinId) {
        whereClause.BmlLinId = filter.BmlLinId;
      }
      if (filter.BmlModId) {
        whereClause.BmlModId = filter.BmlModId;
      }
      result = await BrandModelLineModel.findAll({ where: whereClause });
    } else {
      result = await BrandModelLineModel.findAll({ where: { enabled: true } });
    }
    return result;
  }

  async getById(id: number): Promise<IBrandModelLine> {
    return await BrandModelLineModel.findOne({ where: { BmlId: id, enabled: true } });
  }

  async set(mmm: INewBrandModelLine): Promise<IBrandModelLine> {
    return await BrandModelLineModel.create(mmm);
  }

  async upd(bml: IBrandModelLine, BmlId: number) {
    return await BrandModelLineModel.update(bml, { where: { BmlId, enabled: true } });
  }

  async del(BmlId: number, userId: number) {
    const bml = await BrandModelLineModel.findOne({ where: { BmlId, enabled: true }, raw: true });
    if (bml) {
      bml.enabled = false;
      bml.deletedAt = new Date();
      bml.deletedUser = userId;

      return await BrandModelLineModel.update(bml, { where: { BmlId } });
    }
  }
}

export const brandModelLineRepository = new BrandModelLineRepository();
