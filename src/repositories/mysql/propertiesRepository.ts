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

  async setPropertyValue(propertyValue: any) {
    try {
      const sql = `insert into productPropertieValues (value,productPropertieSubItemId) values('${propertyValue.value}',${propertyValue.id})`;
      const result = await this.connection.query(sql);
      return <any[]>result[0];
    } catch (err) {
      console.log(err);
    }
  }

  async setPropertie(propertie: IPropertyMySql) {
    const sql = `insert into properties (productTypeId,categoryId,propertyName) values(${propertie.productTypeId},${propertie.categoryId},${propertie.propertyName} )`;
    const result = await this.connection.query(sql);

    return <any[]>result[0];
  }

  async getPropertiesByProductType(productTypeId: number) {
    const sql = `select id,propertyName,isGeneric from productProperties where productTypeid = ${productTypeId}`;
    const result = await this.connection.query(sql);

    return <any[]>result[0];
  }

  async setProperty(property: any) {
    const productPropertySql = `insert into productProperties (productTypeId,categoryId,propertyName) values(${property.productTypeId},${property.categoryId},'${property.propertyName}')`;
    const productProperty = await this.connection.query(productPropertySql);
    console.log(Object.assign(productProperty[0]).insertId);
    if (Object.assign(productProperty[0]).insertId) {
      for (let i in property.subProperties) {
        const subPropertySql = `insert into productPropertiesSubItems (productPropertyId,subPropertyName) values(${
          Object.assign(productProperty[0]).insertId
        },'${property.subProperties[i].name}')`;
        const subPropertyResult = await this.connection.query(subPropertySql);
        console.log(Object.assign(subPropertyResult[0]).insertId);

        if (Object.assign(subPropertyResult[0]).insertId) {
          const productPropertieValuesSql = `insert into productPropertieValues (value,productPropertieSubItemId) values('${
            property.subProperties[i].value
          }',${Object.assign(subPropertyResult[0]).insertId})`;
          await this.connection.query(productPropertieValuesSql);
        }
      }
    }
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

  async setProductPresentationProperty(ppp: IProductPresentationProperty) {
    const sql = `insert into productPresentationPropertie (productId,productPropertieValueId) values(${ppp.productId},${ppp.productPropertieValueId} )`;
    const result = await this.connection.query(sql);
    return <any[]>result[0];
  }
}

export const propertiesRepository = new PropertiesRepository();
