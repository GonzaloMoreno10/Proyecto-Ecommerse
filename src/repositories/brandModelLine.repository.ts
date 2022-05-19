import { BrandModelLineModel } from '../datasource/sequelize';
import { INewBrandModelLine, IBrandModelLine } from '../interface/brandModelLine.interface';

class MarcaModeloLineaRepository {
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
}

export const marcaModeloLineaRepository = new MarcaModeloLineaRepository();
