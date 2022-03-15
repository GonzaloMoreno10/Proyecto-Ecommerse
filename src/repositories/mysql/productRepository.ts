import { IProduct, ProductQueryInterface } from '../../interface';
import { mysqlDataSource } from '../../services/mysql';

class ProductRepository {
  async findByKeyWord(search: string): Promise<IProduct[]> {
    const query = `select distinct p.* from products p 
    join categorias c on c.id = p.categoria 
    join product_types pt on pt.id = p.product_type_id 
    join marcas m on m.id = p.marca_id 
    where (p.nombre like '%${search}%' or c.nombre like '%${search}%' or pt.nombre like '%${search}%')`;
    const result = await this.connection.query(query);
    return <IProduct[]>result[0];
  }
  private connection = mysqlDataSource.connection();

  async getProducts(): Promise<IProduct[]> {
    const query = 'select * from products';
    const result = await this.connection.query(query);
    return <IProduct[]>result[0];
  }

  async getProductsById(id: number): Promise<IProduct> {
    const query = `select * from products where id = ${id}`;
    const result = await this.connection.query(query);
    return <IProduct>(<unknown>result[0]);
  }

  async getRelatedProducts(id: number, categoria: number, marca: number, productType: number): Promise<IProduct[]> {
    const query = `select * from products where (categoria = ${categoria} or product_type_id = ${productType} or marca_id = ${marca}) and id <> ${id}`;
    const result = await this.connection.query(query);
    return <IProduct[]>(<unknown>result[0]);
  }

  async getProductsQuery(options: ProductQueryInterface): Promise<IProduct[]> {
    const query = `select * from products`;
    let where = ' where 1 = 1 ';
    if (options.categoria) where += ` and categoria = ${options.categoria}`;
    if (options.codigo) where += ` and codigo = ${options.codigo}`;
    if (options.maxPrice) where += ` and precio <= ${options.maxPrice}`;
    if (options.minPrice) where += ` and precio >= ${options.minPrice}`;
    if (options.nombre) where += ` and nombre like '%${options.nombre}%'`;
    if (options.marca) where += ` and marca_id = ${options.marca}`;
    if (options.productType) where += ` and product_type_id = ${options.productType}`;

    const result = await this.connection.query(query + where);
    return <IProduct[]>(<unknown>result[0]);
  }

  async setProduct(product: IProduct) {
    let query = `insert into products (nombre,descripcion,codigo,foto,precio,stock,categoria,product_type_id,marca_id) values('${product.nombre}','${product.descripcion}',${product.codigo},'${product.foto}',${product.precio},${product.stock},${product.categoria},${product.productTypeId},${product.marcaId})`;
    let data = await this.connection.query(query);
    return Object.assign(data[0]).insertId;
  }

  async updateProduct(product: IProduct, id: number) {
    let query = `update products set nombre = '${product.nombre}',descripcion='${product.descripcion}',foto ='${product.foto}',precio = ${product.precio},stock = ${product.stock} where id = ${id}`;
    let data = await this.connection.query(query);
    return Object.assign(data[0]);
  }

  async deleteProduct(id: number) {
    let query = `delete products where id = ${id}`;
    let data = await this.connection.query(query);
    console.log(data[0]);
    return Object.assign(data[0]);
  }
}

export const mysqlProductRepository = new ProductRepository();