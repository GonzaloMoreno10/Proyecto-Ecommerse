"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Venv = void 0;
var Venv;
(function (Venv) {
    Venv.PORT = process.env.PORT || 8080;
    Venv.MYSQL_USER = process.env.MYSQL_USER || 'root';
    Venv.MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || 'root';
    Venv.MYSQL_DBNAME = process.env.MYSQL_DBNAME || 'ecommerce';
    Venv.MONGO_USER = process.env.MONGO_USER || 'root';
    Venv.MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'root';
    Venv.MONGO_DB = process.env.MONGO_DB || 'ecommerce';
    Venv.MONGO_ATLAS_USER = process.env.MONGO_ATLAS_USER || 'admin';
    Venv.MONGO_ATLAS_PASSWORD = process.env.MONGO_ATLAS_PASSWORD || 'admin';
    Venv.MONGO_ATLAS_DB = process.env.MONGO_ATLAS_DB || 'ecommerce';
    Venv.MONGO_ATLAS_CLUSTER = process.env.MONGO_ATLAS_CLUSTER || 'cluster0.6d6g8.mongodb.net';
})(Venv = exports.Venv || (exports.Venv = {}));
