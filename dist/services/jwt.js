"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generarJwt = void 0;
const fs_1 = __importDefault(require("fs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generarJwt = (body) => {
    const cuerpo = body;
    const privateKey = fs_1.default.readFileSync('./jwt.pem', 'utf8');
    const sign = jsonwebtoken_1.default.sign(cuerpo, privateKey, {
        algorithm: 'RS256',
    });
    return sign;
};
exports.generarJwt = generarJwt;
