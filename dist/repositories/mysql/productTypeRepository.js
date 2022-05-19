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
exports.productTypeRepository = void 0;
const mysql_1 = require("../../services/mysql");
class ProductTypeRepository {
    constructor() {
        this.connection = mysql_1.mysqlDataSource.connection();
    }
    getProductTypes() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'select * from product_types';
            const result = yield this.connection.execute(sql);
            return result[0];
        });
    }
    setProductType({ categoryId, nombre, image }) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `insert into product_types (nombre,categoryId,image) values('${nombre}',${categoryId},'${image}')`;
            const result = yield this.connection.execute(sql);
            return result[0];
        });
    }
    getProductTypesByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const array = name.split(',');
            console.log(array);
            let where = '';
            array.forEach((arr, index) => {
                index < array.length - 1 ? (where += `${arr}|`) : (where += arr);
            });
            const sql = `select distinct  c.id as categoryId,c.nombre as categoryName,pt.id as productTypeId,pt.nombre as productTypeName from product_types pt,categorias c 
    where (c.nombre REGEXP '${where}' or pt.nombre REGEXP '${where}')
    and c.id = pt.categoryId 
    union
    select distinct c.id as categoryId,c.nombre as categoryNombre,pt.id as productTypeId,pt.nombre as productTypeName from products p 
    join categorias c on c.id = p.categoria 
    join product_types pt on pt.id = p.product_type_id
    where p.nombre REGEXP '${where}'
    union
    select distinct p.categoria as categoryId,c.nombre as categoryNombre,pt.id as productTypeId,pt.nombre as productTypeName from products p
    join marcaModeloLinea mml on mml.id = p.marcaModeloLineaId 
    join marcas m on m.id = mml.marcaId 
    join categorias c on c.id = p.categoria 
    join product_types pt on pt.id = p.product_type_id 
    where m.nombre REGEXP '${where}'
    LIMIT 5`;
            const result = yield this.connection.execute(sql);
            for (let i in result[0]) {
                const sql = `select * from marcas m 
      where m.productTypeId = ${result[0][i].productTypeId}
      and m.nombre REGEXP '${where}'`;
                const marca = yield this.connection.execute(sql);
                if (marca[0][0]) {
                    result[0][i].marcaNombre = marca[0][0].nombre;
                    result[0][i].marcaId = marca[0][0].id;
                }
            }
            console.log(result[0]);
            return result[0];
        });
    }
    getProductTypesByCategory(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'select pt.nombre ,pt.id,pt.image,c.nombre as categoryNombre,c.id as categoryId from product_types pt, categorias c where c.id = pt.categoryId and categoryId = ' +
                categoryId;
            const result = yield this.connection.execute(sql);
            return result[0];
        });
    }
    getProductTypeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'select pt.*,c.nombre as categoryNombre,c.id as categoryId from product_types pt,categorias c  where c.id = pt.categoryId and pt.id = ' +
                id;
            const result = yield this.connection.execute(sql);
            return result[0];
        });
    }
}
exports.productTypeRepository = new ProductTypeRepository();
