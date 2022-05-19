"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mysqlDataSource = exports.MySqlDataSource = void 0;
const promise_1 = require("mysql2/promise");
const venv_1 = require("../constantes/venv");
const minimist_1 = __importDefault(require("minimist"));
class MySqlDataSource {
    connection() {
        let conn;
        const argumentos = (0, minimist_1.default)(process.argv.slice(2));
        if (argumentos.local) {
            conn = (0, promise_1.createPool)({
                host: 'localhost',
                user: 'root',
                password: 'root',
                database: 'integraciones',
            });
        }
        else {
            conn = (0, promise_1.createPool)({
                host: venv_1.MYSQL_HOST,
                user: venv_1.MYSQL_USER,
                password: venv_1.MYSQL_PASSWORD,
                database: venv_1.MYSQL_DBNAME,
            });
        }
        return conn;
    }
}
exports.MySqlDataSource = MySqlDataSource;
exports.mysqlDataSource = new MySqlDataSource();
