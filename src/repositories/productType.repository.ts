import { CategoryModel, ProductTypeModel } from '../datasource/sequelize';
import { INewProductType } from '../interface/productType.interface';
const { Op } = require('sequelize');
class ProductTypeRepository {
  async getProductTypes() {
    const result = await ProductTypeModel.findAll();
    return result[0];
  }

  async setProductType(productType: INewProductType) {
    return await ProductTypeModel.create(productType);
  }

  async getProductTypesByName(name: string) {
    const array = name.split(',').filter(word => word !== '');
    let query = '';
    array.forEach((arr, index) => {
      index < array.length - 1 ? (query += `%${arr}%}`) : (query += arr);
    });

    const res = await ProductTypeModel.findAll({
      where: {
        [Op.or]: [
          { TypName: { [Op.like]: `${query[query.length - 2]}` } },
          { TypName: { [Op.like]: `${query[query.length - 1]}` } },
          { TypName: { [Op.like]: `${query[query.length]}` } },
        ],
      },
    });
    return res;

    // const sql = `select distinct  c.id as categoryId,c.nombre as categoryName,pt.id as productTypeId,pt.nombre as productTypeName from product_types pt,categorias c
    // where (c.nombre REGEXP '${where}' or pt.nombre REGEXP '${where}')
    // and c.id = pt.categoryId
    // union
    // select distinct c.id as categoryId,c.nombre as categoryNombre,pt.id as productTypeId,pt.nombre as productTypeName from products p
    // join categorias c on c.id = p.categoria
    // join product_types pt on pt.id = p.product_type_id
    // where p.nombre REGEXP '${where}'
    // union
    // select distinct p.categoria as categoryId,c.nombre as categoryNombre,pt.id as productTypeId,pt.nombre as productTypeName from products p
    // join marcaModeloLinea mml on mml.id = p.marcaModeloLineaId
    // join marcas m on m.id = mml.marcaId
    // join categorias c on c.id = p.categoria
    // join product_types pt on pt.id = p.product_type_id
    // where m.nombre REGEXP '${where}'
    // LIMIT 5`;
    // const result: any = await this.connection.execute(sql);
    // for (let i in result[0]) {
    //   const sql = `select * from marcas m
    //   where m.productTypeId = ${result[0][i].productTypeId}
    //   and m.nombre REGEXP '${where}'`;
    //   const marca: any = await this.connection.execute(sql);
    //   if (marca[0][0]) {
    //     result[0][i].marcaNombre = marca[0][0].nombre;
    //     result[0][i].marcaId = marca[0][0].id;
    //   }
    // }
    // return <any[]>result[0];
  }

  async getProductTypesByCategory(categoryId: number) {
    const result = await ProductTypeModel.findAll({
      where: { TypCatId: categoryId },
      include: [{ model: CategoryModel, required: true }],
    });
    return result;
  }

  async getProductTypeById(id: number) {
    const result = await ProductTypeModel.findOne({
      where: { TypId: id },
      include: [{ model: CategoryModel, required: true }],
    });
    return result;
  }
}

export const productTypeRepository = new ProductTypeRepository();
