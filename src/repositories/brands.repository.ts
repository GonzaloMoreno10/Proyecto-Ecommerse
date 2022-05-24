import { BrandModel, ProductTypeModel } from '../datasource/sequelize';
import { IBrand, INewBrand } from '../interface/brand.model';

class BrandsRepository {
  async get(): Promise<IBrand[]> {
    return await BrandModel.findAll({ where: { enabled: true } });
  }

  async getById(BraId: number): Promise<IBrand> {
    return await BrandModel.findOne({ where: { BraId, enabled: true } });
  }

  async upd(brand: IBrand, BraId: number) {
    return await BrandModel.update(brand, { where: { BraId } });
  }

  async del(BraId: number, userId: number) {
    const brand = await BrandModel.findOne({ where: { BraId }, raw: true });
    if (brand) {
      console.log(userId);
      brand.deletedAt = new Date();
      brand.enabled = false;
      brand.deletedUser = userId;
      return await BrandModel.update(brand, { where: { BraId } });
    }
  }

  async set(marca: INewBrand): Promise<IBrand> {
    return await BrandModel.create(marca);
  }

  async getByCategory(BraCatId: number): Promise<IBrand[]> {
    return await BrandModel.findAll({
      where: { enabled: true },
      include: [
        {
          model: ProductTypeModel,
          where: { BraCatId },
          required: true,
          attributes: [],
        },
      ],
    });
  }

  async getBrandsByProductType(BraTypId: number): Promise<IBrand[]> {
    return await BrandModel.findAll({
      where: { BraTypId, enabled: true },
    });
  }
}

export const brandsRepository = new BrandsRepository();
