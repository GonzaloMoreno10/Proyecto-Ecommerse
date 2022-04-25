import { IProduct, IProperty, ProductQueryInterface } from '../../interface';
import { mysqlDataSource } from '../../services/mysql';

class ProductRepository {
  async findProductsByMarca(id: number) {
    const sql = `select p.* from products p 
    join marcaModeloLinea mml on p.marcaModeloLineaId = mml.id 
    join marcas m on m.id = mml.marcaId 
    where m.id = ${id}
    and p.activo = 1`;
    try {
      const result = await this.connection.query(sql);
      return <IProduct[]>result[0];
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async findByKeyWord(search: string): Promise<IProduct[]> {
    let where = '';
    const array = search.split(' ');
    console.log(array);
    array.forEach((arr, index) => {
      index < array.length - 1 ? (where += `${arr}|`) : (where += arr);
    });
    console.log(where);
    const query = `select distinct p.* from products p 
    join categorias c on c.id = p.categoria 
    join product_types pt on pt.id = p.product_type_id 
    join marcas m on m.id = p.marca_id 
    where (p.nombre REGEXP '${where}' or c.nombre REGEXP '${where}' or pt.nombre REGEXP '${where}') and p.activo = 1`;

    console.log(query);
    const result = await this.connection.query(query);
    return <IProduct[]>result[0];
  }
  private connection = mysqlDataSource.connection();

  async getProducts(): Promise<IProduct[]> {
    const query = 'select * from products where activo = 1';
    const result = await this.connection.query(query);
    return <IProduct[]>result[0];
  }

  async getProductsByProductType(productType: number) {
    try {
      const query = `select
      p.*,
      m.nombre as marcaNombre,
      pt.id as ptId,
      pt.nombre as ptNombre,
      c.id as categoryId,
      c.nombre as categoryName
    from
      products p,
      marcas m,
      categorias c,
      product_types pt 
    where
      pt.id = ${productType}
      and p.activo = 1
      and m.id = p.marca_id
      and pt.id = p.product_type_id 
      and c.id = p.categoria ;`;
      const result = await this.connection.query(query);
      return <IProduct[]>result[0];
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async getProductsBySellerUser(userId: number, activo: number) {
    try {
      const query = `select
      p.*,
      m.nombre as marcaNombre,
      pt.id as ptId,
      pt.nombre as ptNombre,
      c.id as categoryId,
      c.nombre as categoryName
    from
      products p,
      marcas m,
      categorias c,
      product_types pt 
    where
      p.sellerUser = ${userId} and 
      ${activo === 1 ? 'activo = 1' : 'activo >= 0'}
      and m.id = p.marca_id
      and pt.id = p.product_type_id 
      and c.id = p.categoria ;`;

      console.log(query);
      const result = await this.connection.query(query);
      return <IProduct[]>result[0];
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async getProductsById(id: number): Promise<IProduct> {
    const query = `select
    p.*,
    m.id as marcaId,
    m.nombre as marcaNombre,
    mo.id as modeloId,
    mo.nombre as modeloNombre,
    li.id as lineaId,
    li.nombre as lineaNombre,
    pt.id as ptId,
    pt.nombre as ptNombre,
    c.id as categoryId,
    c.nombre as categoryName
  from
    products p
     join categorias c on c.id = p.categoria 
     join product_types pt on pt.id = p.product_type_id 
    left join marcaModeloLinea mml on mml.id = p.marcaModeloLineaId 
    left join marcas m on m.id = mml.marcaId
    left join modelos mo on mo.id = mml.modeloId
    left join lineas li on li.id = mml.lineaId
  where
    p.id = ${id}
    and p.activo = 1 `;
    const result = await this.connection.query(query);
    return <IProduct>(<unknown>result[0]);
  }

  async getRelatedProducts(id: number): Promise<IProduct[]> {
    if (id) {
      const query = `select * from products p where 
      (categoria = (select categoria from products  where id = ${id} ) 
      or product_type_id = (select product_type_id from products  where id = ${id} ) 
      or marca_id = (select marca_id from products  where id = ${id} )) and activo = 1 
      and id <> ${id}`;
      const result = await this.connection.query(query);
      return <IProduct[]>(<unknown>result[0]);
    }
  }
  async getProductsByLastOrdersUser(userId: number) {
    const sql = `select * from products p1
    where categoria in (
    select categoria from products  p
    where id in (select op.productId from orderProducts op join orders o on o.id = op.orderId where op.productId = p.id and o.userId = ${userId} ))
    and p1.id not in (select id from products  p
    where id in (select op.productId from orderProducts op join orders o on o.id = op.orderId where op.productId = p.id and o.userId = ${userId})) 
    and p1.activo = 1 LIMIT 20`;
    const result = await this.connection.query(sql);
    return <IProduct[]>(<unknown>result[0]);
  }

  async getOffers() {
    const sql = `select * from products 
                  where isOferta = 1
                  and descuento > 0
                  and activo = 1
                  and stock > 0
                  order by descuento desc`;
    const result = await this.connection.query(sql);
    return <IProduct[]>(<unknown>result[0]);
  }

  async findProductProperties(productId: number): Promise<IProperty[]> {
    console.log(productId);
    const query = `select pp.isGeneric, pp.id as ppId,pp.propertyName ,ppsi.id as ppsiId, ppsi.subPropertyName ,ppv.id as ppvId, ppv.value from productPresentationPropertie ppp 
    join productPropertieValues ppv on ppv.id = ppp.productPropertieValueId 
    join productPropertiesSubItems ppsi on ppsi.id = ppv.productPropertieSubItemId 
    join productProperties pp on pp.id = ppsi.productPropertyId 
    where productId = ${productId}
    order by pp.isGeneric desc`;
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
          isGeneric: prop[i][0].isGeneric,
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
      const query = 'select * from products where activo = 1 and id in (';
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
    const query = `select
    p.*,
    m.nombre as marcaNombre,
    pt.id as ptId,
    pt.nombre as ptNombre,
    c.id as categoryId,
    c.nombre as categoryName
  from
    products p,
    marcas m,
    categorias c,
    product_types pt `;
    let where = ` where m.id = p.marca_id
    and pt.id = p.product_type_id 
    and p.activo = 1
    and c.id = p.categoria  `;
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
    console.log(product);
    let query = `insert into products (nombre,descripcion,codigo,foto,precio,stock,categoria,product_type_id,marca_id,isOferta,descuento,activo,fotos,marcaModeloLineaId,sellerUser) values('${
      product.nombre
    }','${product.descripcion}',123,'${product.foto ?? ''}',${product.precio},${product.stock},${product.categoria},${
      product.productTypeId
    },${product.marcaId},${product.isOferta},${product.descuento ?? null},1,'${
      product.fotos ? JSON.stringify(product.fotos) : ''
    }',${product.marcaModeloLineaId},${product.userId})`;
    let data = await this.connection.query(query);
    return Object.assign(data[0]).insertId;
  }

  async updateProduct(product: IProduct, id: number) {
    let query = `update products set nombre = '${product.nombre}',descripcion='${product.descripcion}',foto ='${product.foto}',precio = ${product.precio},stock = ${product.stock} where id = ${id}`;
    let data = await this.connection.query(query);
    return Object.assign(data[0]);
  }

  async updatePicture(id: number, dir: string) {
    let query = `update products set foto = '${dir}' where id = ${id}`;
    let data = await this.connection.query(query);
    console.log(data[0]);
    return Object.assign(data[0]);
  }

  async deleteProduct(id: number) {
    let query = `delete from products where id = ${id}`;
    let data = await this.connection.query(query);
    console.log(data[0]);
    return Object.assign(data[0]);
  }
}

export const mysqlProductRepository = new ProductRepository();
