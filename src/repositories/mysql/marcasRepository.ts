import { mysqlDataSource } from '../../services/mysql';

class MarcaRepository {
  private connection = mysqlDataSource.connection();

  async getMarcas() {
    const sql = 'select * from marcas';
    const result = await this.connection.execute(sql);
    return result[0];
  }

  async getMarcasByProductType(productType: number, categoriaId: number) {
    const sql = `select m.* from marcas m 
    join product_types pt on pt.id  = m.productTypeId 
    join categorias c on c.id = pt.categoryId 
    where pt.id = ${productType}
    and c.id = ${categoriaId}`;
    const result = await this.connection.execute(sql);
    return result[0];
  }
}

export const marcasRepository = new MarcaRepository();
