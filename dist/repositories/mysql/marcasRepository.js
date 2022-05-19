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
exports.marcasRepository = void 0;
const mysql_1 = require("../../services/mysql");
class MarcaRepository {
    constructor() {
        this.connection = mysql_1.mysqlDataSource.connection();
    }
    getMarcas() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'select * from marcas';
            const result = yield this.connection.execute(sql);
            return result[0];
        });
    }
    getMarcasById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `select * from marcas where id = ${id}`;
            const result = yield this.connection.execute(sql);
            return result[0];
        });
    }
    createMarca(marca) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `insert into marcas (productTypeId,nombre,image) values(${marca.productTypeId},'${marca.nombre}','${marca.image}')`;
            const result = yield this.connection.execute(sql);
            return result[0];
        });
    }
    getMarcasByCategory(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `select distinct m.nombre,m.id,m.image from marcaModeloLinea mml,marcas m,product_types pt ,categorias c 
    where mml.marcaId = m.id
    and pt.id  = m.productTypeId 
    and c.id = pt.categoryId
    and exists(select 1 from products p where p.marcaModeloLineaId = mml.id)
    and c.id = ${categoryId}`;
            const result = yield this.connection.execute(sql);
            return result[0];
        });
    }
    getMarcasByProductType(productType) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `select m.* from marcas m 
    left join product_types pt on pt.id  = m.productTypeId 
    left join categorias c on c.id = pt.categoryId 
    where (pt.id = ${productType} or m.productTypeId = 0)`;
            const result = yield this.connection.execute(sql);
            return result[0];
        });
    }
}
exports.marcasRepository = new MarcaRepository();
