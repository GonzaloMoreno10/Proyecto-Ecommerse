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
const mysql_1 = require("../../services/mysql");
const sequelizeProductModel_1 = require("../../models/sequelizeProductModel");
class ProductRepository {
    constructor() {
        this.connection = mysql_1.mysqlDataSource.connection();
    }
    findProductsByMarca(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `select p.* from products p 
    join marcaModeloLinea mml on p.marcaModeloLineaId = mml.id 
    join marcas m on m.id = mml.marcaId 
    where m.id = ${id}
    and p.activo = 1`;
            try {
                const result = yield this.connection.query(sql);
                return result[0];
            }
            catch (err) {
                console.log(err);
                return err;
            }
        });
    }
    findByKeyWord(search) {
        return __awaiter(this, void 0, void 0, function* () {
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
            const result = yield this.connection.query(query);
            return result[0];
        });
    }
    getProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const whereClause = { activo: 1 };
            const result = yield sequelizeProductModel_1.ProductModel.findAll({ where: whereClause });
            return result[0];
        });
    }
    getProductsByProductType(productType) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const result = yield this.connection.query(query);
                return result[0];
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
                const result = yield this.connection.query(query);
                return result[0];
            }
            catch (err) {
                console.log(err);
                return err;
            }
        });
    }
    getProductsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
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
            const result = yield this.connection.query(query);
            return result[0];
        });
    }
    getRelatedProducts(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id) {
                const query = `select * from products p where 
      (categoria = (select categoria from products  where id = ${id} ) 
      or product_type_id = (select product_type_id from products  where id = ${id} ) 
      or marca_id = (select marca_id from products  where id = ${id} )) and activo = 1 
      and id <> ${id}`;
                const result = yield this.connection.query(query);
                return result[0];
            }
        });
    }
    getProductsByLastOrdersUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `select * from products p1
    where categoria in (
    select categoria from products  p
    where id in (select op.productId from orderProducts op join orders o on o.id = op.orderId where op.productId = p.id and o.userId = ${userId} ))
    and p1.id not in (select id from products  p
    where id in (select op.productId from orderProducts op join orders o on o.id = op.orderId where op.productId = p.id and o.userId = ${userId})) 
    and p1.activo = 1 LIMIT 20`;
            const result = yield this.connection.query(sql);
            return result[0];
        });
    }
    getOffers() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `select * from products 
                  where isOferta = 1
                  and descuento > 0
                  and activo = 1
                  and stock > 0
                  order by descuento desc`;
            const result = yield this.connection.query(sql);
            return result[0];
        });
    }
    findProductProperties(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(productId);
            const query = `select pp.isGeneric, pp.id as ppId,pp.propertyName ,ppsi.id as ppsiId, ppsi.subPropertyName ,ppv.id as ppvId, ppv.value from productPresentationPropertie ppp 
    join productPropertieValues ppv on ppv.id = ppp.productPropertieValueId 
    join productPropertiesSubItems ppsi on ppsi.id = ppv.productPropertieSubItemId 
    join productProperties pp on pp.id = ppsi.productPropertyId 
    where productId = ${productId}
    order by pp.isGeneric desc`;
            const result = yield this.connection.query(query);
            return result[0];
        });
    }
    getProductPresentationById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const finalArray = [];
            let product = yield exports.mysqlProductRepository.getProductsById(productId);
            if (product[0]) {
                let prop = {};
                let properties = yield exports.mysqlProductRepository.findProductProperties(productId);
                properties.forEach(property => {
                    const propertyName = property.propertyName;
                    if (!prop[propertyName])
                        prop[propertyName] = [];
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
                    const properties = {
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
            console.log(product);
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
            console.log(data[0]);
            return Object.assign(data[0]);
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `delete from products where id = ${id}`;
            let data = yield this.connection.query(query);
            console.log(data[0]);
            return Object.assign(data[0]);
        });
    }
}
exports.mysqlProductRepository = new ProductRepository();
