const { Op } = require('sequelize');
import {
  ProductPresentationPropertyModel,
  ProductPropertyModel,
  ProductPropertySubItemModel,
  ProductPropertyValueModel,
} from '../datasource/sequelize';
import { INewProductPresentationProperty } from '../interface/productPresentationProperty.interface';
import { INewProductProperty } from '../interface/productProperty.interface';
import { INewProductPropertySubItem } from '../interface/productPropertySubItem.interface';
import { mysqlDataSource } from '../services/mysql.service';

class PropertiesRepository {
  private connection = mysqlDataSource.connection();
  async getPropertyByid(propertyId: number) {
    try {
      const result = await ProductPropertyModel.findOne({ where: { ProId: propertyId } });
      return result;
    } catch (err) {
      console.log(err);
    }
  }
  async setPropertyValue(propertyValue: any) {
    try {
      const sql = `insert into productPropertieValues (value,productPropertieSubItemId) values('${propertyValue.value}',${propertyValue.id})`;
      const result = await this.connection.query(sql);
      return <any[]>result[0];
    } catch (err) {
      console.log(err);
    }
  }

  async setPropertie(property: INewProductProperty) {
    const sql = `insert into properties (productTypeId,categoryId,propertyName) values(${property.ProTypId},${property.ProCatId},${property.ProName} )`;
    const result = await this.connection.query(sql);

    return <any[]>result[0];
  }

  async getPropertiesByProductType(productTypeId: number) {
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

  async getProductPresentationPropertiesByProductId(productId: number) {
    const result = await ProductPresentationPropertyModel.findAll({ where: { PreProId: productId } });
    return result;
  }

  async setProperty(property: any) {
    const productPropertySql = `insert into productProperties (productTypeId,categoryId,propertyName) values(${property.productTypeId},${property.categoryId},'${property.propertyName}')`;
    const productProperty = await this.connection.query(productPropertySql);
    if (Object.assign(productProperty[0]).insertId) {
      for (let i in property.subProperties) {
        const subPropertySql = `insert into productPropertiesSubItems (productPropertyId,subPropertyName) values(${
          Object.assign(productProperty[0]).insertId
        },'${property.subProperties[i].name}')`;
        const subPropertyResult = await this.connection.query(subPropertySql);

        if (Object.assign(subPropertyResult[0]).insertId) {
          const productPropertieValuesSql = `insert into productPropertieValues (value,productPropertieSubItemId) values('${
            property.subProperties[i].value
          }',${Object.assign(subPropertyResult[0]).insertId})`;
          await this.connection.query(productPropertieValuesSql);
        }
      }
      return Object.assign(productProperty[0]).insertId;
    }
  }

  async deletePropertiesByProduct(productId: number) {
    const sql = `delete from productPresentationPropertie where productId = ${productId}`;
    const result = await this.connection.query(sql);

    return <any[]>result[0];
  }

  async getSubProperties(propertyId: number) {
    const result = await ProductPropertySubItemModel.findAll({ where: { SuiProId: propertyId } });
    return result;
  }

  async getSubPropertiesById(id: number) {
    const result = await ProductPropertySubItemModel.findAll({ where: { SuiId: id } });
    return result;
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

  async getProductPropertieValues(subPropId: number) {
    const result = await ProductPropertyValueModel.findAll({ where: { ValSuiId: subPropId } });

    return result;
  }

  async setPropertySubItems(subProperty: INewProductPropertySubItem) {
    const sql = `insert into productPropertiesSubItems (productPropertyId,subPropertyName) values(${subProperty.SuiProId},${subProperty.SuiName} )`;
    const result = await this.connection.query(sql);
    return <any[]>result[0];
  }

  async setProductPresentationProperty(ppp: INewProductPresentationProperty) {
    const sql = `insert into productPresentationPropertie (productId,productPropertieValueId) values(${ppp.PreProId},${ppp.PreValId} )`;
    const result = await this.connection.query(sql);
    return <any[]>result[0];
  }
}

export const propertiesRepository = new PropertiesRepository();
