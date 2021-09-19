"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Venv = void 0;
var Venv;
(function (Venv) {
    Venv.PORT = process.env.PORT || 8080;
    Venv.MYSQL_USER = process.env.MYSQL_USER || 'root';
    Venv.MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || 'root';
    Venv.MYSQL_DBNAME = process.env.MYSQL_DBNAME || 'ecommerce';
})(Venv = exports.Venv || (exports.Venv = {}));
