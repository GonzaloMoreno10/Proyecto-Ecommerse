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
exports.mysqlCategoriaRepository = void 0;
const mysql_1 = require("../../services/mysql");
class ProductRepository {
    constructor() {
        this.connection = mysql_1.mysqlDataSource.connection();
    }
    getCategorias() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'select * from categorias';
            const result = yield this.connection.query(query);
            return result[0];
        });
    }
    getCategoriasById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `select * from categorias where id = ${id}`;
                const result = yield this.connection.query(query);
                return result[0];
            }
            catch (err) {
                console.log(err);
                return err;
            }
        });
    }
    setCategoria(categoria) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `insert into categorias (nombre) values('${categoria.nombre}')`;
            let data = yield this.connection.query(query);
            return Object.assign(data[0]).insertId;
        });
    }
    getCategoriaByNombre(nombre) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let query = `select * from categorias where nombre like '%${nombre}%'`;
                let result = yield this.connection.query(query);
                return result[0];
            }
            catch (err) {
                return err;
            }
        });
    }
    deleteCategoria(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `delete categorias where id = ${id}`;
            let data = yield this.connection.query(query);
            console.log(data[0]);
            return Object.assign(data[0]);
        });
    }
}
exports.mysqlCategoriaRepository = new ProductRepository();
