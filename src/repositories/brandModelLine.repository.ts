import { BrandModelLineModel } from '../datasource/sequelize';
import { INewBrandModelLine, IBrandModelLine } from '../interface/brandModelLine.interface';

class BrandModelLineRepository {
  async getBrandModelLine(): Promise<IBrandModelLine[]> {
    const result = await BrandModelLineModel.findAll();
    return <IBrandModelLine[]>(<unknown>result);
  }

  async getBrandModelLineById(id: number): Promise<IBrandModelLine> {
    const result = await BrandModelLineModel.findOne({ where: { BmlId: id } });
    return <IBrandModelLine>(<unknown>result);
  }

  async setBrandModelLine(mmm: INewBrandModelLine) {
    const result = BrandModelLineModel.create(mmm);
    return result;
  }

  async updBrandModelLine(bml: IBrandModelLine, BmlId: number) {
    return await BrandModelLineModel.update(bml, { where: { BmlId } });
  }

  async delBrandModelLine(BmlId: number, userId: number) {
    const bml = await BrandModelLineModel.findOne({ where: { BmlId }, raw: true });
    if (bml) {
      bml.enabled = false;
      bml.updatedAt = new Date();
      bml.updatedUser = userId;

      return await BrandModelLineModel.update(bml, { where: { BmlId } });
    }
  }
}

export const brandModelLineRepository = new BrandModelLineRepository();
