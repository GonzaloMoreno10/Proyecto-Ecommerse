import { BrandModel, ProductTypeModel } from '../datasource/sequelize';
import { IBrand, INewBrand } from '../interface/brand.model';

class BrandsRepository {
  async getBrands(): Promise<IBrand[]> {
    const result = await BrandModel.findAll();
    return <IBrand[]>(<unknown>result);
  }

  async getBrandsById(BraId: number): Promise<IBrand> {
    const result = await BrandModel.findOne({ where: { BraId } });
    return <IBrand>(<unknown>result);
  }

  async updBrand(brand: IBrand, BraId: number) {
    return await BrandModel.update(brand, { where: { BraId } });
  }

  async delBrand(BraId: number, userId: number) {
    const brand = await BrandModel.findOne({ where: { BraId }, raw: true });
    if (brand) {
      brand.updatedAt = new Date();
      brand.enabled = false;
      brand.updatedUser = userId;

      return await BrandModel.update(brand, { where: { BraId } });
    }
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

export const brandsRepository = new BrandsRepository();
