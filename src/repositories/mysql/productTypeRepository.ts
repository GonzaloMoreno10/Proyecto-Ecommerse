import { mysqlDataSource } from '../../services/mysql';

class ProductTypeRepository {
  private connection = mysqlDataSource.connection();

  async getProductTypes() {
    const sql = 'select * from product_types';
    const result = await this.connection.execute(sql);
    return result[0];
  }

  async setProductType({ categoryId, nombre }) {
    const sql = `insert into product_types (nombre,categoryId) values('${nombre}',${categoryId})`;
    const result = await this.connection.execute(sql);
    return result[0];
  }

  async getProductTypesByName(name: string): Promise<any[]> {
    const sql = `select c.id as categoryId,c.nombre as categoryName,pt.id as productTypeId,pt.nombre as productTypeName from product_types pt,categorias c 
    where (pt.nombre like '%${name}%'or c.nombre like '%${name}%')
    and c.id = pt.categoryId`;
    const result = await this.connection.execute(sql);
    return <any[]>result[0];
  }

  async getProductTypesByCategory(categoryId: number) {
    const sql = 'select * from product_types where categoryId = ' + categoryId;
    const result = await this.connection.execute(sql);
    return result[0];
  }
}

export const productTypeRepository = new ProductTypeRepository();
