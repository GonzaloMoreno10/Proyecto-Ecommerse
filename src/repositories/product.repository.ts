import { IProduct } from '../interface';
import { mysqlDataSource } from '../services/mysql.service';
import {
  CategoryModel,
  LineModel,
  BrandModel,
  BrandModelLineModel,
  ModelModel,
  OrderModel,
  OrderProductsModel,
  ProductModel,
  ProductTypeModel,
} from '../datasource/sequelize';
const { Op } = require('sequelize');
class ProductRepository {
  async findProductsByMarca(id: number) {
    try {
      const resToReturn = await ProductModel.findAll({
        where: { enabled: true },
        include: [
          {
            model: BrandModelLineModel,
            required: true,
            include: [{ model: BrandModel, required: true, where: { id: id } }],
          },
        ],
      });

      return <IProduct[]>(<unknown>resToReturn);
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async findByKeyWord(search: string): Promise<IProduct[]> {
    const array = search.split(' ').filter(word => word !== '' && word.length > 2);

    const res = await ProductModel.findAll({
      where: {
        [Op.or]: [
          array[0] ? { nombre: { [Op.like]: `%${array[0]}%` } } : '',
          array[1] ? { nombre: { [Op.like]: `%${array[1]}%` } } : '',
          array[2] ? { nombre: { [Op.like]: `%${array[2]}%` } } : '',
          array[3] ? { nombre: { [Op.like]: `%${array[3]}%` } } : '',
        ],
      },
      include: [
        {
          required: false,
          model: ProductTypeModel,
          where: {
            [Op.or]: [
              array[0] ? { nombre: { [Op.like]: `%${array[0]}%` } } : '',
              array[1] ? { nombre: { [Op.like]: `%${array[1]}%` } } : '',
              array[2] ? { nombre: { [Op.like]: `%${array[2]}%` } } : '',
              array[3] ? { nombre: { [Op.like]: `%${array[3]}%` } } : '',
            ],
          },
          include: [
            {
              required: false,
              model: CategoryModel,
              where: {
                [Op.or]: [
                  array[0] ? { nombre: { [Op.like]: `%${array[0]}%` } } : '',
                  array[1] ? { nombre: { [Op.like]: `%${array[1]}%` } } : '',
                  array[2] ? { nombre: { [Op.like]: `%${array[2]}%` } } : '',
                  array[3] ? { nombre: { [Op.like]: `%${array[3]}%` } } : '',
                ],
              },
            },
          ],
        },
      ],
    });

    return <IProduct[]>(<unknown>res);
  }
  private connection = mysqlDataSource.connection();

  async getProducts(): Promise<IProduct[]> {
    const result = await ProductModel.findAll({
      attributes: { exclude: ['PrCatId', 'PrBraId', 'PrTypId', 'PrBmlId'] },
      where: {
        enabled: true,
      },
      include: [
        {
          model: BrandModelLineModel,
          attributes: { exclude: ['BmlBraId', 'BmlModId', 'BmlLinId'] },
          include: [
            { model: BrandModel, attributes: ['BraId', 'BraName'] },
            { model: ModelModel, attributes: ['ModId', 'ModName'] },
            { model: LineModel, attributes: ['LinId', 'LinName'] },
          ],
        },
        {
          model: ProductTypeModel,
          include: [{ model: CategoryModel, attributes: ['CatId', 'CatName'] }],
          attributes: ['TypId', 'TypName'],
        },
      ],
    });
    return <IProduct[]>(<unknown>result);
  }

  async getProductsByProductType(productType: number) {
    try {
      const result = await ProductModel.findAll({
        attributes: { exclude: ['PrCatId', 'PrBraId', 'PrTypId', 'PrBmlId'] },
        where: {
          enabled: true,
          ProTypId: productType,
        },
        include: [
          {
            model: BrandModelLineModel,
            attributes: { exclude: ['BmlBraId', 'BmlModId', 'BmlLinId'] },
            include: [
              { model: BrandModel, attributes: ['BraId', 'BraName'] },
              { model: ModelModel, attributes: ['ModId', 'ModName'] },
              { model: LineModel, attributes: ['LinId', 'LinName'] },
            ],
          },
          {
            model: ProductTypeModel,
            include: [{ model: CategoryModel, attributes: ['CatId', 'CatName'] }],
            attributes: ['TypId', 'TypName'],
          },
        ],
      });
      return <IProduct[]>(<unknown>result);
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async getProductsBySellerUser(userId: number, activo: number) {
    try {
      const result = ProductModel.findAll({
        where: { ProUsrId: userId },
        include: [
          { model: BrandModelLineModel, required: true, include: [{ model: BrandModel, required: true }] },
          {
            model: ProductTypeModel,
            required: true,
            include: [{ model: CategoryModel, required: true }],
          },
        ],
      });
      return <IProduct[]>(<unknown>result);
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async getProductsById(id: number): Promise<IProduct> {
    try {
      const result = await ProductModel.findOne({
        attributes: { exclude: ['ProCatId', 'ProBraId', 'ProTypId', 'ProBmlId'] },
        where: {
          enabled: true,
          ProId: id,
        },
        include: [
          {
            model: BrandModelLineModel,

            attributes: { exclude: ['BmlBraId', 'BmlModId', 'BmlLinId'] },
            include: [
              { model: BrandModel, attributes: ['BraId', 'BraName'] },
              { model: ModelModel, attributes: ['ModId', 'ModName'] },
              { model: LineModel, attributes: ['LinId', 'linName'] },
            ],
          },
          {
            model: ProductTypeModel,

            include: [{ model: CategoryModel, attributes: ['CatId', 'CatName'] }],
            attributes: ['TypId', 'TypName'],
          },
        ],
      });
      return <IProduct>(<unknown>result);
    } catch (err) {
      return err;
    }
  }

  async getRelatedProducts(id: number): Promise<IProduct[]> {
    const prod = await ProductModel.findOne({
      attributes: ['categoria', 'product_type_id'],
      where: { ProId: id },
      include: [
        {
          model: BrandModelLineModel,
          required: true,
          attributes: ['marcaId'],
        },
      ],
      limit: 10,
    });
    if (prod) {
      const prodToReturn = ProductModel.findAll({
        where: {
          ProId: { [Op.ne]: id },

          [Op.or]: [
            { categoria: prod.ProCatId },
            {
              product_type_id: prod.ProTypId,
            },
            { marca_id: Object.assign(prod).MarcaModeloLinea.marcaId },
          ],
        },
        limit: 15,
      });
      return <IProduct[]>(<unknown>prodToReturn);
    }
  }
  async getProductsByLastOrdersUser(userId: number) {
    const res = await OrderModel.findAll({
      attributes: ['id', 'createdAt'],
      where: { OrdUsrId: userId },
      include: [
        {
          model: OrderProductsModel,
          attributes: ['orderId', 'productId'],
          required: true,
          include: [{ model: ProductModel, attributes: ['categoria', 'id'], required: true }],
        },
      ],
      group: ['categoria', 'productId'],
      order: [['createdAt', 'desc']],
    });

    const categoryArray = res.map(res => {
      const cat = Object.assign(res).OrderProducts.map(op => {
        return op.Product.categoria;
      });
      return cat;
    });
    const productArray = res.map(res => {
      const prod = Object.assign(res).OrderProducts.map(op => {
        return op.productId;
      });
      return prod;
    });

    const resToReturn = ProductModel.findAll({
      where: {
        ProId: { [Op.notIn]: productArray },
        [Op.or]: {
          categoria: categoryArray,
        },
      },
      limit: 10,
    });

    // const sql = `select * from products p1
    // where categoria in (
    // select categoria from products  p
    // where id in (select op.productId from orderProducts op join orders o on o.id = op.orderId where op.productId = p.id and o.userId = ${userId} ))
    // and p1.id not in (select id from products  p
    // where id in (select op.productId from orderProducts op join orders o on o.id = op.orderId where op.productId = p.id and o.userId = ${userId}))
    // and p1.activo = 1 LIMIT 20`;
    // const result = await this.connection.query(sql);
    return <IProduct[]>(<unknown>resToReturn);
  }

  async getOffers() {
    try {
      const result = await ProductModel.findAll({
        order: [['descuento', 'desc']],
        where: { ProIsOffer: 1, ProDiscount: { [Op.gt]: 6 }, enabled: true, ProStock: { [Op.gt]: 0 } },
      });
      return <IProduct[]>(<unknown>result);
    } catch (err) {
      console.log(err);
    }
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

  async getProductsByCategoryId(categoryId: number) {
    const result = await ProductModel.findAll({
      where: { ProCatId: categoryId },
      include: [{ model: ProductTypeModel }],
    });
    return result;
  }

  async getProductsQuery(options): Promise<IProduct[]> {
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

  async setProduct(product) {
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

  async updateProduct(product, id: number) {
    let query = `update products set nombre = '${product.nombre}',descripcion='${product.descripcion}',foto ='${product.foto}',precio = ${product.precio},stock = ${product.stock} where id = ${id}`;
    let data = await this.connection.query(query);
    return Object.assign(data[0]);
  }

  async updatePicture(id: number, dir: string) {
    let query = `update products set foto = '${dir}' where id = ${id}`;
    let data = await this.connection.query(query);
    return Object.assign(data[0]);
  }

  async deleteProduct(id: number) {
    let query = `delete from products where id = ${id}`;
    let data = await this.connection.query(query);
    return Object.assign(data[0]);
  }
}

export const mysqlProductRepository = new ProductRepository();
