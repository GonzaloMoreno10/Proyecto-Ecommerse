import { mysqlDataSource } from '../../services/mysql';

class MarcaRepository {
  private connection = mysqlDataSource.connection();

  async getMarcas() {
    const sql = 'select * from marcas';
    const result = await this.connection.execute(sql);
    return result[0];
  }

  async getMarcasById(id: number) {
    const sql = `select * from marcas where id = ${id}`;
    const result = await this.connection.execute(sql);
    return result[0];
  }

  async createMarca(marca: any) {
    const sql = `insert into marcas (productTypeId,nombre) values(${marca.productTypeId},'${marca.nombre}')`;
    const result = await this.connection.execute(sql);
    return result[0];
  }

  async getMarcasByProductType(productType: number) {
    const sql = `select m.* from marcas m 
    left join product_types pt on pt.id  = m.productTypeId 
    left join categorias c on c.id = pt.categoryId 
    where (pt.id = ${productType} or m.productTypeId = 0)`;
    const result = await this.connection.execute(sql);
    return result[0];
  }
}

export const marcasRepository = new MarcaRepository();
