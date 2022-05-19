"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = void 0;
const venv_1 = require("../constants/venv");
exports.dbConfig = {
    username: venv_1.MYSQL_USER,
    password: venv_1.MYSQL_PASSWORD,
    database: venv_1.MYSQL_DBNAME,
    host: venv_1.MYSQL_HOST,
    Dialect: 'mysql',
};
