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
const bcrypt_1 = __importDefault(require("bcrypt"));
const sequelize_1 = require("../datasource/sequelize");
class UserRepository {
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield sequelize_1.UserModel.findAll();
            return result;
        });
    }
    getUsersById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield sequelize_1.UserModel.findOne({ where: { UsrId: id } });
            return result;
        });
    }
    getUsersByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield sequelize_1.UserModel.findOne({ where: { UsrEmail: email } });
            return result;
        });
    }
    updateUser(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield sequelize_1.UserModel.update(user, { where: { UsrId: id } });
            console.log(result);
            return result;
        });
    }
    setUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield bcrypt_1.default.genSalt(10);
            const hash = yield bcrypt_1.default.hash(user.UsrPass, salt);
            user.UsrValidCod = hash;
            user.UsrPass = hash;
            return yield sequelize_1.UserModel.create(user);
        });
    }
}
exports.mysqlUserRepository = new UserRepository();
