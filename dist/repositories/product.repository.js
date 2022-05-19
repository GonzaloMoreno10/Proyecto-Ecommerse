"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mysqlProductRepository = void 0;
const mysql_service_1 = require("../services/mysql.service");
const sequelize_1 = require("../datasource/sequelize");
const { Op } = require('sequelize');
class ProductRepository {
    constructor() {
        this.connection = mysql_service_1.mysqlDataSource.connection();
    }
    findProductsByMarca(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resToReturn = yield sequelize_1.ProductModel.findAll({
                    where: { enabled: true },
                    include: [
                        {
                            model: sequelize_1.BrandModelLineModel,
                            required: true,
                            include: [{ model: sequelize_1.BrandModel, required: true, where: { id: id } }],
                        },
                    ],
                });
                return resToReturn;
            }
            catch (err) {
                console.log(err);
                return err;
            }
        });
    }
    findByKeyWord(search) {
        return __awaiter(this, void 0, void 0, function* () {
            const array = search.split(' ').filter(word => word !== '' && word.length > 2);
            const res = yield sequelize_1.ProductModel.findAll({
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
                        model: sequelize_1.ProductTypeModel,
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
                                model: sequelize_1.CategoryModel,
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
            return res;
        });
    }
    getProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield sequelize_1.ProductModel.findAll({
                attributes: { exclude: ['PrCatId', 'PrBraId', 'PrTypId', 'PrBmlId'] },
                where: {
                    enabled: true,
                },
                include: [
                    {
                        model: sequelize_1.BrandModelLineModel,
                        attributes: { exclude: ['BmlBraId', 'BmlModId', 'BmlLinId'] },
                        include: [
                            { model: sequelize_1.BrandModel, attributes: ['BraId', 'BraName'] },
                            { model: sequelize_1.ModelModel, attributes: ['ModId', 'ModName'] },
                            { model: sequelize_1.LineModel, attributes: ['LinId', 'LinName'] },
                        ],
                    },
                    {
                        model: sequelize_1.ProductTypeModel,
                        include: [{ model: sequelize_1.CategoryModel, attributes: ['CatId', 'CatName'] }],
                        attributes: ['TypId', 'TypName'],
                    },
                ],
            });
            return result;
        });
    }
    getProductsByProductType(productType) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield sequelize_1.ProductModel.findAll({
                    attributes: { exclude: ['PrCatId', 'PrBraId', 'PrTypId', 'PrBmlId'] },
                    where: {
                        enabled: true,
                        ProTypId: productType,
                    },
                    include: [
                        {
                            model: sequelize_1.BrandModelLineModel,
                            attributes: { exclude: ['BmlBraId', 'BmlModId', 'BmlLinId'] },
                            include: [
                                { model: sequelize_1.BrandModel, attributes: ['BraId', 'BraName'] },
                                { model: sequelize_1.ModelModel, attributes: ['ModId', 'ModName'] },
                                { model: sequelize_1.LineModel, attributes: ['LinId', 'LinName'] },
                            ],
                        },
                        {
                            model: sequelize_1.ProductTypeModel,
                            include: [{ model: sequelize_1.CategoryModel, attributes: ['CatId', 'CatName'] }],
                            attributes: ['TypId', 'TypName'],
                        },
                    ],
                });
                return result;
            }
            catch (err) {
                console.log(err);
                return err;
            }
        });
    }
    getProductsBySellerUser(userId, activo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = sequelize_1.ProductModel.findAll({
                    where: { ProUsrId: userId },
                    include: [
                        { model: sequelize_1.BrandModelLineModel, required: true, include: [{ model: sequelize_1.BrandModel, required: true }] },
                        {
                            model: sequelize_1.ProductTypeModel,
                            required: true,
                            include: [{ model: sequelize_1.CategoryModel, required: true }],
                        },
                    ],
                });
                return result;
            }
            catch (err) {
                console.log(err);
                return err;
            }
        });
    }
    getProductsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield sequelize_1.ProductModel.findOne({
                    attributes: { exclude: ['ProCatId', 'ProBraId', 'ProTypId', 'ProBmlId'] },
                    where: {
                        enabled: true,
                        ProId: id,
                    },
                    include: [
                        {
                            model: sequelize_1.BrandModelLineModel,
                            attributes: { exclude: ['BmlBraId', 'BmlModId', 'BmlLinId'] },
                            include: [
                                { model: sequelize_1.BrandModel, attributes: ['BraId', 'BraName'] },
                                { model: sequelize_1.ModelModel, attributes: ['ModId', 'ModName'] },
                                { model: sequelize_1.LineModel, attributes: ['LinId', 'linName'] },
                            ],
                        },
                        {
                            model: sequelize_1.ProductTypeModel,
                            include: [{ model: sequelize_1.CategoryModel, attributes: ['CatId', 'CatName'] }],
                            attributes: ['TypId', 'TypName'],
                        },
                    ],
                });
                return result;
            }
            catch (err) {
                return err;
            }
        });
    }
    getRelatedProducts(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const prod = yield sequelize_1.ProductModel.findOne({
                attributes: ['categoria', 'product_type_id'],
                where: { ProId: id },
                include: [
                    {
                        model: sequelize_1.BrandModelLineModel,
                        required: true,
                        attributes: ['marcaId'],
                    },
                ],
                limit: 10,
            });
            if (prod) {
                const prodToReturn = sequelize_1.ProductModel.findAll({
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
                return prodToReturn;
            }
        });
    }
    getProductsByLastOrdersUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield sequelize_1.OrderModel.findAll({
                attributes: ['id', 'createdAt'],
                where: { OrdUsrId: userId },
                include: [
                    {
                        model: sequelize_1.OrderProductsModel,
                        attributes: ['orderId', 'productId'],
                        required: true,
                        include: [{ model: sequelize_1.ProductModel, attributes: ['categoria', 'id'], required: true }],
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
            const resToReturn = sequelize_1.ProductModel.findAll({
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
            return resToReturn;
        });
    }
    getOffers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield sequelize_1.ProductModel.findAll({
                    order: [['descuento', 'desc']],
                    where: { ProIsOffer: 1, ProDiscount: { [Op.gt]: 6 }, enabled: true, ProStock: { [Op.gt]: 0 } },
                });
                return result;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    findByIds(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = 'select * from products where activo = 1 and id in (';
                let id = '';
                for (let i in ids) {
                    if (parseInt(i) < ids.length - 1) {
                        id += `${ids[i].toString()},`;
                    }
                    else {
                        id += `${ids[i].toString()})`;
                    }
                }
                const result = yield this.connection.query(query + id);
                return result[0];
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    getProductsByCategoryId(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield sequelize_1.ProductModel.findAll({
                where: { ProCatId: categoryId },
                include: [{ model: sequelize_1.ProductTypeModel }],
            });
            return result;
        });
    }
    getProductsQuery(options) {
        return __awaiter(this, void 0, void 0, function* () {
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
            if (options.categoria)
                where += ` and categoria = ${options.categoria}`;
            if (options.codigo)
                where += ` and codigo = ${options.codigo}`;
            if (options.maxPrice)
                where += ` and precio <= ${options.maxPrice}`;
            if (options.minPrice)
                where += ` and precio >= ${options.minPrice}`;
            if (options.nombre)
                where += ` and nombre like '%${options.nombre}%'`;
            if (options.marca)
                where += ` and marca_id = ${options.marca}`;
            if (options.productType)
                where += ` and product_type_id = ${options.productType}`;
            const result = yield this.connection.query(query + where);
            return result[0];
        });
    }
    setProduct(product) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let query = `insert into products (nombre,descripcion,codigo,foto,precio,stock,categoria,product_type_id,marca_id,isOferta,descuento,activo,fotos,marcaModeloLineaId,sellerUser) values('${product.nombre}','${product.descripcion}',123,'${(_a = product.foto) !== null && _a !== void 0 ? _a : ''}',${product.precio},${product.stock},${product.categoria},${product.productTypeId},${product.marcaId},${product.isOferta},${(_b = product.descuento) !== null && _b !== void 0 ? _b : null},1,'${product.fotos ? JSON.stringify(product.fotos) : ''}',${product.marcaModeloLineaId},${product.userId})`;
            let data = yield this.connection.query(query);
            return Object.assign(data[0]).insertId;
        });
    }
    updateProduct(product, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `update products set nombre = '${product.nombre}',descripcion='${product.descripcion}',foto ='${product.foto}',precio = ${product.precio},stock = ${product.stock} where id = ${id}`;
            let data = yield this.connection.query(query);
            return Object.assign(data[0]);
        });
    }
    updatePicture(id, dir) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `update products set foto = '${dir}' where id = ${id}`;
            let data = yield this.connection.query(query);
            return Object.assign(data[0]);
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `delete from products where id = ${id}`;
            let data = yield this.connection.query(query);
            return Object.assign(data[0]);
        });
    }
}
exports.mysqlProductRepository = new ProductRepository();
