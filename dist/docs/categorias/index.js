"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getCategorias_1 = __importDefault(require("./getCategorias"));
const createCategoria_1 = __importDefault(require("./createCategoria"));
exports.default = {
    '/categorias': Object.assign(Object.assign({}, getCategorias_1.default), createCategoria_1.default),
};
