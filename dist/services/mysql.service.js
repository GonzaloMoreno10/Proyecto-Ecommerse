"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mysqlDataSource = exports.MySqlDataSource = void 0;
const promise_1 = require("mysql2/promise");
const venv_1 = require("../constants/venv");
class MySqlDataSource {
    connection() {
        let conn;
        conn = (0, promise_1.createPool)({
            host: venv_1.MYSQL_HOST,
            user: venv_1.MYSQL_USER,
            password: venv_1.MYSQL_PASSWORD,
            database: venv_1.MYSQL_DBNAME,
        });
        return conn;
    }
}
exports.MySqlDataSource = MySqlDataSource;
exports.mysqlDataSource = new MySqlDataSource();
