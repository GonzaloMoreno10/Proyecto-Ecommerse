"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductFactoryDAO = void 0;
const persistencias_1 = require("../constantes/persistencias");
const DAOs_1 = require("../DAOs");
class ProductFactoryDAO {
    static get(tipo) {
        switch (tipo) {
            case persistencias_1.tipoPersistencias.FS:
                console.log('RETORNANDO INSTANCIA CLASE FS');
                return new DAOs_1.FileSystemRepository();
            case persistencias_1.tipoPersistencias.MYSQL:
                console.log('RETORNANDO INSTANCIA CLASE MYSQL');
                return new DAOs_1.MySqlProductoRepository();
            /*case TipoPersistencia.MongoAtlas:
              console.log('RETORNANDO INSTANCIA CLASE MONGO ATLAS');
              return new ProductosAtlasDAO();
      
            case TipoPersistencia.LocalMongo:
              console.log('RETORNANDO INSTANCIA CLASE MONGO LOCAL');
              return new ProductosAtlasDAO(true);*/
            default:
                console.log('RETORNANDO INSTANCIA CLASE MEMORIA');
            //return new ProductosMemDAO();
        }
    }
}
exports.ProductFactoryDAO = ProductFactoryDAO;
