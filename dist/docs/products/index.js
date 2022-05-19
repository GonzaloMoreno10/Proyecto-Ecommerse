"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deleteProduct_1 = __importDefault(require("./deleteProduct"));
const getProduct_1 = __importDefault(require("./getProduct"));
const getProducts_1 = __importDefault(require("./getProducts"));
const saveProduct_1 = __importDefault(require("./saveProduct"));
const updateProduct_1 = __importDefault(require("./updateProduct"));
exports.default = {
    '/products': Object.assign(Object.assign({}, getProducts_1.default), saveProduct_1.default),
    '/products/{id}': Object.assign(Object.assign(Object.assign({}, getProduct_1.default), updateProduct_1.default), deleteProduct_1.default),
};
