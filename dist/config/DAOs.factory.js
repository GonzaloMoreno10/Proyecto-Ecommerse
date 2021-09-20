"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductFactoryDAO = void 0;
const persistencias_1 = require("../constantes/persistencias");
const DAOs_1 = require("../DAOs");
const firebase_respository_1 = require("../DAOs/firebase.respository");
const memory_repository_1 = require("../DAOs/memory.repository");
const mongo_repository_1 = require("../DAOs/mongo.repository");
const sqlite_repository_1 = require("../DAOs/sqlite.repository");
//import { SqliteRepository } from '../DAOs/sqlite.repository';
class ProductFactoryDAO {
    static get(tipo) {
        switch (tipo) {
            case persistencias_1.tipoPersistencias.FS:
                console.log('RETORNANDO INSTANCIA CLASE FS');
                return new DAOs_1.FileSystemRepository();
            case persistencias_1.tipoPersistencias.MYSQL_LOCAL:
                console.log('RETORNANDO INSTANCIA CLASE MYSQL');
                return new DAOs_1.MySqlProductoRepository();
            case persistencias_1.tipoPersistencias.MONGO_LOCAL:
                console.log('RETORNANDO INSTANCIA CLASE MONGO LOCAL');
                return new mongo_repository_1.MongoProductsRepository(true);
            case persistencias_1.tipoPersistencias.MONGO_ATLAS:
                console.log('RETORNANDO INSTANCIA CLASE MONGO ATLAS');
                return new mongo_repository_1.MongoProductsRepository(false);
            case persistencias_1.tipoPersistencias.SQLITE:
                console.log('RETORNANDO INSTANCIA CLASE SQLITE');
                return new sqlite_repository_1.SqliteRepository();
            case persistencias_1.tipoPersistencias.FIREBASE:
                console.log('RETORNANDO FIREBASE INSTANCE');
                return new firebase_respository_1.FirebaseRepository();
            default:
                console.log('RETORNANDO INSTANCIA CLASE MEMORIA');
                return new memory_repository_1.ProdMemoriaRepository();
        }
    }
}
exports.ProductFactoryDAO = ProductFactoryDAO;
