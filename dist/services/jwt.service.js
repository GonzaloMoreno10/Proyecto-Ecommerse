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
exports.generateToken = exports.verfiyToken = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const moment_1 = __importDefault(require("moment"));
const venv_1 = require("../constants/venv");
const sequelize_1 = require("../datasource/sequelize");
const verfiyToken = (token) => {
    if (!token) {
        return { code: 401, message: 'No token value' };
    }
    try {
        const userData = jsonwebtoken_1.default.verify(token, venv_1.SECRET_TOKEN_PASSWORD);
        if (userData) {
            return { code: 200, userData };
        }
    }
    catch (err) {
        console.log(err);
        return { code: 401, message: err };
    }
};
exports.verfiyToken = verfiyToken;
const generateToken = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { UsrPass, UsrEmail } = user;
    if (!UsrPass || !UsrEmail) {
        return { code: 130 };
    }
    const userFound = yield sequelize_1.UserModel.findOne({ where: { UsrEmail } });
    if (!userFound) {
        return { code: 131 };
    }
    if (!(yield bcrypt_1.default.compare(UsrPass, userFound.password))) {
        return { code: 131 };
    }
    if (!userFound.verificado) {
        return { code: 129 };
    }
    const expiration = (0, moment_1.default)()
        .add({ minutes: parseInt(venv_1.TOKEN_TIME) })
        .unix();
    const payload = {
        userId: userFound.id,
        userRol: userFound.rol_id,
        iat: (0, moment_1.default)().unix(),
        exp: expiration,
    };
    const token = { token: jsonwebtoken_1.default.sign(payload, venv_1.SECRET_TOKEN_PASSWORD, { algorithm: 'HS256' }), exp: expiration };
    return { code: 121, token };
});
exports.generateToken = generateToken;
