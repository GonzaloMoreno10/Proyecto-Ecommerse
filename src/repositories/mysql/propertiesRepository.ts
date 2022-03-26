import { IProperty, ISubProperty } from '../../interface';
import {
  IProductPresentationProperty,
  IPropertyMySql,
  IPropertySubItems,
  IPropertyValue,
} from '../../interface/properties';
import { mysqlDataSource } from '../../services/mysql';
class PropertiesRepository {
  private connection = mysqlDataSource.connection();

  async setPropertie(propertie: IPropertyMySql) {
    const sql = `insert into properties (productTypeId,categoryId,propertyName) values(${propertie.productTypeId},${propertie.categoryId},${propertie.propertyName} )`;
    const result = await this.connection.query(sql);

    return <any[]>result[0];
  }

  async getPropertiesByProductType(productTypeId: number) {
    const sql = `select id,propertyName from productProperties where (productTypeid = ${productTypeId} or id = 0)`;
    const result = await this.connection.query(sql);

    return <any[]>result[0];
  }

  async deletePropertiesByProduct(productId: number) {
    const sql = `delete from productPresentationPropertie where productId = ${productId}`;
    const result = await this.connection.query(sql);

    return <any[]>result[0];
  }

  async getSubProperties(propertyId: number) {
    const sql = `select id, subPropertyName from productPropertiesSubItems where productPropertyId = ${propertyId}`;
    const result = await this.connection.query(sql);

    return <any[]>result[0];
  }

  async getProductPropertieValues(subPropId: number) {
    const sql = `select id,value from productPropertieValues where productPropertieSubItemId = ${subPropId}`;
    const result = await this.connection.query(sql);

    return <any[]>result[0];
  }

  async setPropertySubItems(subProperty: IPropertySubItems) {
    const sql = `insert into productPropertiesSubItems (productPropertyId,subPropertyName) values(${subProperty.productPropertyId},${subProperty.subPropertyName} )`;
    const result = await this.connection.query(sql);
    return <any[]>result[0];
  }

  async setPropertyValue(propertyValue: IPropertyValue) {
    const sql = `insert into productPropertieValues (value,productPropertieSubItemId) values(${propertyValue.value},${propertyValue.productPropertieSubItemId} )`;
    const result = await this.connection.query(sql);
    return <any[]>result[0];
  }

  async setProductPresentationProperty(ppp: IProductPresentationProperty) {
    const sql = `insert into productPresentationPropertie (productId,productPropertieValueId) values(${ppp.productId},${ppp.productPropertieValueId} )`;
    const result = await this.connection.query(sql);
    return <any[]>result[0];
  }
}

export const propertiesRepository = new PropertiesRepository();
