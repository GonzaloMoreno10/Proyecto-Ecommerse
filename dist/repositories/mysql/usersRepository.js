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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mysqlUserRepository = void 0;
const mysql_1 = require("../../services/mysql");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserRepository {
    constructor() {
        this.connection = mysql_1.mysqlDataSource.connection();
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'select * from users';
            const result = yield this.connection.query(query);
            return result[0];
        });
    }
    getUsersById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `select * from users where id = ${id}`;
            const result = yield this.connection.query(query);
            return result[0];
        });
    }
    getUsersByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `select * from users where email = '${email}'`;
            let data = yield this.connection.query(query);
            return data[0][0];
        });
    }
    updateUser(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = `update users set nombre = '${user.nombre}',fecha_nacimiento = '${user.fecha_nacimiento}', avatar= '${user.avatar}'`;
            let data = yield this.connection.query(query);
            return data[0];
        });
    }
    setUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield bcrypt_1.default.genSalt(10);
            const hash = yield bcrypt_1.default.hash(user.password, salt);
            user.password = hash;
            let query = `insert into users (email,password,nombre,direccion,fecha_nacimiento,telefono,rol_id,avatar) values ('${user.email}','${user.password}','${user.nombre}','${user.direccion}','${user.fecha_nacimiento}','${user.telefono}',1,'${user.avatar}')`;
            let data = yield this.connection.query(query);
            console.log(data[0]);
            return Object.assign(data[0]).insertId;
        });
    }
}
exports.mysqlUserRepository = new UserRepository();
