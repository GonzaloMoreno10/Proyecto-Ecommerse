import { mysqlDataSource } from '../../services/mysql';

class ProductTypeRepository {
  private connection = mysqlDataSource.connection();

  async getProductTypes() {
    const sql = 'select * from product_types';
    const result = await this.connection.execute(sql);
    return result[0];
  }

  async getProductTypesByCategory(categoryId: number) {
    const sql = 'select * from product_types where categoryId = ' + categoryId;
    const result = await this.connection.execute(sql);
    return result[0];
  }
}

export const productTypeRepository = new ProductTypeRepository();
