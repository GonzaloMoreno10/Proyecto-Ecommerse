import { INewProduct, IProduct, IProductFilters, IProductQueryFields, IProductRelations } from '../interface';
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
  sequelize,
  ProductPresentationPropertyModel,
} from '../datasource/sequelize';
import { sortProduct } from '../utils/sortProducts';
import { ModuleResolutionKind } from 'typescript';
const { Op } = require('sequelize');
class ProductRepository {
  async getByBrand(id: number) {
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

  async getByKeyWord(search: string): Promise<IProduct[]> {
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

  async count(): Promise<number> {
    return await ProductModel.count();
  }

  async get(limit: number, offset: number, filter?: Partial<IProductFilters>, fields?: any): Promise<IProduct[]> {
    const whereClause: any = { enabled: filter?.enabled ?? true, ProIsOffer: filter?.ProIsOffer ?? '' };
    if (filter) {
      if (filter.ProCod) whereClause.ProCod = filter.ProCod;
      if (filter.ProUsrId) whereClause.ProUsrId = filter.ProUsrId;
      if (filter.ProTypId) whereClause.ProTypId = filter.ProTypId;
      if (filter.ProCatId) whereClause.ProCatId = filter.ProCatId;
      if (filter.MinStock && filter.MaxStock) {
        whereClause.ProStock = { [Op.between]: [filter.MinStock, filter.MaxStock] };
      } else {
        if (filter.MaxStock) {
          whereClause.ProStock = { [Op.lte]: filter.MaxStock };
        } else {
          if (filter.MinStock) {
            whereClause.ProStock = { [Op.gte]: filter.MinStock };
          }
        }
      }
      if (filter.MinPrice && filter.MaxPrice) {
        whereClause.ProPrice = { [Op.between]: [filter.MinPrice, filter.MaxPrice] };
      } else {
        if (filter.MaxPrice) {
          whereClause.ProPrice = { [Op.lte]: filter.MaxPrice };
        } else {
          if (filter.MinPrice) {
            whereClause.ProPrice = { [Op.gte]: filter.MinPrice };
          }
        }
      }
      if (filter.MinDiscount && filter.MaxDiscount) {
        whereClause.ProDiscount = { [Op.between]: [filter.MinDiscount, filter.MaxDiscount] };
      } else {
        if (filter.MaxDiscount) {
          whereClause.ProDiscount = { [Op.lte]: filter.MaxDiscount };
        } else {
          if (filter.MinDiscount) {
            whereClause.ProDiscount = { [Op.gte]: filter.MinDiscount };
          }
        }
      }
      if (filter.ProName)
        whereClause.ProName = {
          [Op.or]: [
            { [Op.like]: `%${filter.ProName}%` },
            { [Op.like]: `%${filter.ProName.substring(0, filter.ProName.length / 2)}%` },
            { [Op.like]: `%${filter.ProName.split(' ')[0]}%` },
          ],
        };
    }
    const result = await ProductModel.findAll({
      where: whereClause,
      attributes: filter?.ProName
        ? {
            include: [
              [
                sequelize.literal(`(
              select
                case
                  when ProName like '${filter.ProName}' then 4
                  when ProName like '%${filter.ProName}%' then 3
                  when ProName like '%${filter.ProName.substring(0, filter.ProName.length / 2)}%' then 2
                  when ProName like '%${filter.ProName.split(' ')[0]}%' then 1
                  else 0
                  end as 'OrderPriority'
                from
                  PRPRO pr where pr.ProId = PRPRO.ProId)`),
                'OrderPriority',
              ],
            ],
            exclude: ['OrderPriority'],
          }
        : { exclude: ['OrderPriority'] },
      limit,
      offset,
      include: this.constructProductInclude(fields),
      order: [filter?.ProName ? sequelize.literal('OrderPriority DESC') : ['ProName', 'asc']],
    });

    return result;
  }

  async getByProductType(productType: number) {
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

  constructProductInclude(fields: string[]) {
    let toReturn = [];
    if (fields) {
      if (fields.includes('PRBML')) {
        toReturn.push({
          model: BrandModelLineModel,

          attributes: ['BmlId'],
          include: [
            { model: BrandModel, attributes: ['BraId', 'BraName'] },
            { model: ModelModel, attributes: ['ModId', 'ModName'] },
            { model: LineModel, attributes: ['LinId', 'linName'] },
          ],
        });
      }
      if (fields.includes('PRTYP')) {
        toReturn.push({
          model: ProductTypeModel,
        });
      }

      if (fields.includes('PRPRO')) {
        toReturn.push({
          model: ProductPresentationPropertyModel,
        });
      }
      if (fields.includes('PRCAT')) {
        toReturn.push({
          model: CategoryModel,
        });
      }
      return toReturn;
    }
  }

  async getById(id: number, fields: string[] = []): Promise<IProduct> {
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

  async getByRelated(id: number): Promise<IProduct[]> {
    const prod = await ProductModel.findOne({
      attributes: ['ProCatId', 'ProTypId'],
      where: { ProId: id },
      include: [
        {
          model: BrandModelLineModel,
          required: true,
          attributes: ['BmlBraId'],
        },
      ],
      limit: 10,
    });
    if (prod) {
      const prodToReturn = ProductModel.findAll({
        where: {
          ProId: { [Op.ne]: id },

          [Op.or]: [
            { ProCatId: prod.ProCatId },
            {
              ProTypId: prod.ProTypId,
            },
          ],
        },
        limit: 15,
      });
      return <IProduct[]>(<unknown>prodToReturn);
    }
  }
  async getByLastOrderUser(userId: number) {
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

  async getInOffer() {
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

  async getByIds(ids: number[]): Promise<IProduct[]> {
    try {
      return await ProductModel.findAll({ where: { [Op.or]: [{ ProId: ids }] } });
    } catch (err) {
      console.log(err);
    }
  }

  async getByCategory(categoryId: number) {
    const result = await ProductModel.findAll({
      where: { ProCatId: categoryId },
      include: [{ model: ProductTypeModel }],
    });
    return result;
  }

  async set(product: INewProduct) {
    return await ProductModel.create(product);
  }

  async upd(product: Partial<IProduct>, id: number) {
    return await ProductModel.update(product, { where: { ProId: id } });
  }

  async del(id: number, userid: number) {
    const prodUpdate = await ProductModel.findOne({ where: { ProId: id }, raw: true });
    if (prodUpdate) {
      prodUpdate.enabled = false;
      prodUpdate.deletedAt = new Date();
      prodUpdate.deletedUser = userid;

      return await ProductModel.update(prodUpdate, { where: { ProId: id } });
    }
  }
}

export const productRepository = new ProductRepository();
