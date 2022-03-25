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
