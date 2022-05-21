import { INewProduct, IProduct, IProductRelations } from '../interface';
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
  async getProductsByBrand(id: number) {
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

  async getProductsByKeyWord(search: string): Promise<IProduct[]> {
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

  async getProducts(): Promise<IProductRelations[]> {
    const result = await ProductModel.findAll({
      attributes: { exclude: ['PrCatId', 'PrBraId', 'PrTypId', 'PrBmlId'] },
      where: {
        enabled: true,
      },
      include: [
        {
          model: BrandModelLineModel,
          attributes: ['BmlId'],
          where: { enabled: true },
          required: true,
          include: [
            { model: BrandModel, attributes: ['BraId', 'BraName'] },
            { model: ModelModel, attributes: ['ModId', 'ModName'] },
            { model: LineModel, attributes: ['LinId', 'LinName'] },
          ],
        },
        {
          model: ProductTypeModel,
          where: { enabled: true },
          required: true,
          include: [
            { model: CategoryModel, attributes: ['CatId', 'CatName'], where: { enabled: true }, required: true },
          ],
          attributes: ['TypId', 'TypName'],
        },
      ],
    });
    return <IProductRelations[]>(<unknown>result);
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

  constructProductInclude(fields: string[]) {
    let toReturn = [];
    if (fields.filter(x => x === 'PRBML').length > 0 && fields.filter(x => x === 'PRTYP').length > 0) {
      toReturn = [
        {
          model: BrandModelLineModel,

          attributes: ['BmlId'],
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
      ];
    }
    if (fields.filter(x => x === 'PRBML').length == 0 && fields.filter(x => x === 'PRTYP').length > 0) {
      toReturn = [
        {
          model: ProductTypeModel,

          include: [{ model: CategoryModel, attributes: ['CatId', 'CatName'] }],
          attributes: ['TypId', 'TypName'],
        },
      ];
    }
    if (fields.filter(x => x === 'PRBML').length > 0 && fields.filter(x => x === 'PRTYP').length == 0) {
      toReturn = [
        {
          model: BrandModelLineModel,

          attributes: ['BmlId'],
          include: [
            { model: BrandModel, attributes: ['BraId', 'BraName'] },
            { model: ModelModel, attributes: ['ModId', 'ModName'] },
            { model: LineModel, attributes: ['LinId', 'linName'] },
          ],
        },
      ];
    }

    return toReturn;
  }

  async getProductsById(id: number, fields: string[] = []): Promise<IProduct> {
    try {
      const includes = this.constructProductInclude(fields);
      const result = await ProductModel.findOne({
        attributes: { exclude: ['ProCatId', 'ProTypId', 'ProBmlId'] },
        where: {
          enabled: true,
          ProId: id,
        },
        include: includes,
      });
      return <IProduct>(<unknown>result);
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async getProductsRelatedById(id: number): Promise<IProduct[]> {
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

  async getProductsInOffers() {
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

  async getProductsByIds(ids: number[]): Promise<IProduct[]> {
    try {
      return await ProductModel.findAll({ where: { [Op.or]: [{ ProId: ids }] } });
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

  async setProduct(product: INewProduct) {
    return await ProductModel.create(product);
  }

  async updProduct(product: Partial<IProduct>, id: number) {
    return await ProductModel.update(product, { where: { ProId: id } });
  }

  async delProduct(id: number, userid: number) {
    const prodUpdate = await ProductModel.findOne({ where: { ProId: id }, raw: true });
    if (prodUpdate) {
      prodUpdate.enabled = false;
      prodUpdate.updatedAt = new Date();
      prodUpdate.updatedUser = userid;

      return await ProductModel.update(prodUpdate, { where: { ProId: id } });
    }
  }
}

export const productRepository = new ProductRepository();
