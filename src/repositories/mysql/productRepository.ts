import { IProduct, IProperty, ProductQueryInterface } from '../../interface';
import { mysqlDataSource } from '../../services/mysql';
var nl2br = require('nl2br');

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
    const query = `select p.*,m.nombre as marcaNombre from products p, marcas m where p.id = ${id} and m.id = p.marca_id`;
    const result = await this.connection.query(query);
    return <IProduct>(<unknown>result[0]);
  }

  async getRelatedProducts(id: number, categoria: number, marca: number, productType: number): Promise<IProduct[]> {
    if (categoria && marca && productType && id) {
      const query = `select * from products where (categoria = ${categoria} or product_type_id = ${productType} or marca_id = ${marca}) and id <> ${id}`;
      const result = await this.connection.query(query);
      return <IProduct[]>(<unknown>result[0]);
    }
  }

  async findProductProperties(productId: number): Promise<IProperty[]> {
    console.log(productId);
    const query = `select pp.id as ppId,pp.propertyName ,ppsi.id as ppsiId, ppsi.subPropertyName ,ppv.id as ppvId, ppv.value from productPresentationPropertie ppp 
    join productPropertieValues ppv on ppv.id = ppp.productPropertieValueId 
    join productPropertiesSubItems ppsi on ppsi.id = ppv.productPropertieSubItemId 
    join productProperties pp on pp.id = ppsi.productPropertyId 
    where productId = ${productId}
    order by pp.id desc`;
    const result = await this.connection.query(query);
    return <IProperty[]>(<unknown>result[0]);
  }

  async getProductPresentationById(productId: number) {
    const finalArray = [];
    let product = await mysqlProductRepository.getProductsById(productId);
    if (product[0]) {
      let prop: any = {};
      let properties = await mysqlProductRepository.findProductProperties(productId);
      properties.forEach(property => {
        const propertyName = property.propertyName;
        if (!prop[propertyName]) prop[propertyName] = [];
        prop[propertyName].push(property);
      });
      for (let i in prop) {
        const subProperties = [];

        for (const j in prop[i]) {
          subProperties.push({
            subPropertyId: prop[i][j].ppsiId,
            subPropertyName: prop[i][j].subPropertyName,
            ppvId: prop[i][j].ppvId,
            value: prop[i][j].value,
          });
        }
        const properties: IProperty = {
          propertyId: prop[i][0].ppId,
          propertyName: prop[i][0].propertyName,
          subProperties,
        };
        finalArray.push(properties);
      }
      product[0].properties = finalArray;
    }
    return product[0];
  }

  async findByIds(ids: number[]) {
    try {
      const query = 'select * from products where id in (';
      let id = '';
      for (let i in ids) {
        if (parseInt(i) < ids.length - 1) {
          id += `${ids[i].toString()},`;
        } else {
          id += `${ids[i].toString()})`;
        }
      }
      const result = await this.connection.query(query + id);
      return <any[]>result[0];
    } catch (err) {
      console.log(err);
    }
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
