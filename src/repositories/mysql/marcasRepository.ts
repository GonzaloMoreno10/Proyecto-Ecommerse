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
    const sql = `insert into marcas (productTypeId,nombre,image) values(${marca.productTypeId},'${marca.nombre}','${marca.image}')`;
    const result = await this.connection.execute(sql);
    return result[0];
  }

  async getMarcasByCategory(categoryId: number) {
    const sql = `select distinct m.nombre,m.id,m.image from marcaModeloLinea mml,marcas m,product_types pt ,categorias c 
    where mml.marcaId = m.id
    and pt.id  = m.productTypeId 
    and c.id = pt.categoryId
    and exists(select 1 from products p where p.marcaModeloLineaId = mml.id)
    and c.id = ${categoryId}`;
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
