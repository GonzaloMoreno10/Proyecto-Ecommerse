import { CategoryModel, ProductTypeModel } from '../datasource/sequelize';
import { INewProductType } from '../interface/productType.interface';
const { Op } = require('sequelize');
class ProductTypeRepository {
  async getProductTypes() {
    const result = await ProductTypeModel.findAll();
    return result;
  }

  async setProductType(productType: INewProductType) {
    return await ProductTypeModel.create(productType);
  }

  async getProductTypesByCategory(categoryId: number) {
    const result = await ProductTypeModel.findAll({
      where: { TypCatId: categoryId },
      include: [{ model: CategoryModel, required: true }],
    });
    return result;
  }

  async getProductTypeById(id: number) {
    const result = await ProductTypeModel.findOne({
      where: { TypId: id },
      include: [{ model: CategoryModel, required: true }],
    });
    return result;
  }
}

export const productTypeRepository = new ProductTypeRepository();
