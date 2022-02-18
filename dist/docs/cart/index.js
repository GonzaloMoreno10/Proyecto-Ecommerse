"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deleteProductCart_1 = __importDefault(require("./deleteProductCart"));
const getProductCartById_1 = __importDefault(require("./getProductCartById"));
const getProductsCart_1 = __importDefault(require("./getProductsCart"));
const saveProductCart_1 = __importDefault(require("./saveProductCart"));
exports.default = {
    '/carrito/{userId}': Object.assign({}, getProductsCart_1.default),
    '/carrito/{idProducto}/{userId}': Object.assign(Object.assign(Object.assign({}, saveProductCart_1.default), deleteProductCart_1.default), getProductCartById_1.default),
};
