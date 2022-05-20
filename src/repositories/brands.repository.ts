import { BrandModel, ProductTypeModel } from '../datasource/sequelize';
import { IBrand, INewBrand } from '../interface/brand.model';

class MarcaRepository {
  async getBrands(): Promise<IBrand[]> {
    const result = await BrandModel.findAll();
    return <IBrand[]>(<unknown>result);
  }

  async getBrandsById(BraId: number): Promise<IBrand> {
    const result = await BrandModel.findOne({ where: { BraId } });
    return <IBrand>(<unknown>result);
  }

  async setBrand(marca: INewBrand) {
    const result = await BrandModel.create(marca);
    return result;
  }

  async getBrandsByCategoryId(BraCatId: number): Promise<IBrand[]> {
    const result = BrandModel.findAll({
      include: [
        {
          model: ProductTypeModel,
          where: { BraCatId },
          required: true,
          attributes: [],
        },
      ],
    });
    return <IBrand[]>(<unknown>result);
  }

  async getBrandsByProductType(BraTypId: number): Promise<IBrand[]> {
    const result = await BrandModel.findAll({
      include: [
        {
          model: ProductTypeModel,
          required: true,
          where: { BraTypId },
          attributes: [],
        },
      ],
    });
    return <IBrand[]>(<unknown>result);
  }
}

export const marcasRepository = new MarcaRepository();
