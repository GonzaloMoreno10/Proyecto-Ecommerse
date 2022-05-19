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
exports.marcaModeloLineaRepository = void 0;
const mysql_1 = require("../../services/mysql");
class MarcaModeloLineaRepository {
    constructor() {
        this.connection = mysql_1.mysqlDataSource.connection();
    }
    getMarcaModeloLinea() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'select * from marcaModeloLinea';
            const result = yield this.connection.execute(sql);
            return result[0];
        });
    }
    getMarcaModeloLineaById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `select * from marcaModeloLinea where id = ${id}`;
            const result = yield this.connection.execute(sql);
            return result[0];
        });
    }
    setMarcaModeloLinea(mmm) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `insert into marcaModeloLinea (marcaId,modeloId,lineaId) values(${mmm.marcaId},${mmm.modeloId},${mmm.lineaId})`;
            const result = yield this.connection.execute(sql);
            console.log(result[0]);
            return Object.assign(result[0]).insertId;
        });
    }
}
exports.marcaModeloLineaRepository = new MarcaModeloLineaRepository();
