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
exports.lineasRepository = void 0;
const mysql_1 = require("../../services/mysql");
class LineaRepository {
    constructor() {
        this.connection = mysql_1.mysqlDataSource.connection();
    }
    getLineas() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'select * from lineas';
            const result = yield this.connection.execute(sql);
            return result[0];
        });
    }
    getLineaById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `select * from lineas where id = ${id}`;
            const result = yield this.connection.execute(sql);
            return result[0];
        });
    }
    getLineasByModelo(modeloId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `select * from lineas where modeloId = ${modeloId}`;
            const result = yield this.connection.execute(sql);
            return result[0];
        });
    }
    setLinea(linea) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `insert into lineas (modeloId,nombre) values(${linea.modeloId},'${linea.nombre}')`;
            const result = yield this.connection.execute(sql);
            console.log(result[0]);
            return result[0];
        });
    }
}
exports.lineasRepository = new LineaRepository();
