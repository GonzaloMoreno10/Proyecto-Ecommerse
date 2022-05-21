const { Op } = require('sequelize');
import {
  ProductPresentationPropertyModel,
  ProductPropertyModel,
  ProductPropertySubItemModel,
  ProductPropertyValueModel,
} from '../datasource/sequelize';
import { INewProductProperty } from '../interface/productProperty.interface';

class ProductPropertiesRepository {
  async getproductPropertyById(propertyId: number) {
    try {
      const result = await ProductPropertyModel.findOne({ where: { ProId: propertyId } });
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async getProductPropertyByProductTypeId(productTypeId: number) {
    const result = await ProductPropertyModel.findAll({
      where: { ProTypId: productTypeId },
      attributes: { exclude: ['productPropertieValueId'] },
      include: [
        {
          model: ProductPropertySubItemModel,
          required: true,
          attributes: { exclude: ['productPropertieValueId'] },
          include: [
            { model: ProductPropertyValueModel, required: true, attributes: { exclude: ['productPropertieValueId'] } },
          ],
        },
      ],
    });

    return <any[]>result;
  }

  async setProductProperty(property: INewProductProperty) {
    return await ProductPropertyModel.create(property);
  }

  async getPropertiesByProductId(productId: number) {
    const result = await ProductPropertyModel.findAll({
      attributes: { exclude: ['ProTypId', 'ProCatId'] },
      include: [
        {
          model: ProductPropertySubItemModel,
          attributes: { exclude: ['SuiProId'] },
          required: true,
          include: [
            {
              model: ProductPropertyValueModel,
              required: true,
              attributes: {
                exclude: [
                  // 'productPropertieValueId',
                  'ValSuiId',
                  'description',
                ],
              },
              include: [
                {
                  model: ProductPresentationPropertyModel,
                  attributes: { exclude: ['PreId', 'PreValId', 'ProId'] },
                  required: true,
                  where: { PreProId: productId },
                },
              ],
            },
          ],
        },
      ],
    });
    return result;
  }
}

export const productPropertyRepository = new ProductPropertiesRepository();
