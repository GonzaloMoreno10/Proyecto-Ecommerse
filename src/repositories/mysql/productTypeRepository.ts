import { mysqlDataSource } from '../../services/mysql';

class ProductTypeRepository {
  private connection = mysqlDataSource.connection();

  async getProductTypes() {
    const sql = 'select * from product_types';
    const result = await this.connection.execute(sql);
    return result[0];
  }

  async setProductType({ categoryId, nombre, image }) {
    const sql = `insert into product_types (nombre,categoryId,image) values('${nombre}',${categoryId},'${image}')`;
    const result = await this.connection.execute(sql);
    return result[0];
  }

  async getProductTypesByName(name: string): Promise<any[]> {
    const array = name.split(',');
    console.log(array);
    let where = '';
    array.forEach((arr, index) => {
      index < array.length - 1 ? (where += `${arr}|`) : (where += arr);
    });

    console.log(where);
    const sql = `select  c.id as categoryId,c.nombre as categoryName,pt.id as productTypeId,pt.nombre as productTypeName from product_types pt,categorias c 
    where (c.nombre REGEXP '${where}' or pt.nombre REGEXP '${where}')
    and c.id = pt.categoryId LIMIT 5`;
    const result: any = await this.connection.execute(sql);

    for (let i in result[0]) {
      const sql = `select * from marcas m 
      where m.productTypeId = ${result[0][i].productTypeId}
      and m.nombre REGEXP '${where}'`;
      const marca: any = await this.connection.execute(sql);
      if (marca[0][0]) {
        result[0][i].marcaNombre = marca[0][0].nombre;
        result[0][i].marcaId = marca[0][0].id;
      }
    }
    console.log(result[0]);
    return <any[]>result[0];
  }

  async getProductTypesByCategory(categoryId: number) {
    const sql =
      'select pt.nombre ,pt.id,pt.image,c.nombre as categoryNombre,c.id as categoryId from product_types pt, categorias c where c.id = pt.categoryId and categoryId = ' +
      categoryId;
    const result = await this.connection.execute(sql);
    return result[0];
  }

  async getProductTypeById(id: number) {
    const sql =
      'select pt.*,c.nombre as categoryNombre,c.id as categoryId from product_types pt,categorias c  where c.id = pt.categoryId and pt.id = ' +
      id;
    const result = await this.connection.execute(sql);
    return result[0];
  }
}

export const productTypeRepository = new ProductTypeRepository();
