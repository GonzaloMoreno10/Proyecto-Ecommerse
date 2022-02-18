"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getOrders_1 = __importDefault(require("./getOrders"));
const getOrder_1 = __importDefault(require("./getOrder"));
const createOrder_1 = __importDefault(require("./createOrder"));
const compra_1 = __importDefault(require("./compra"));
exports.default = {
    '/ordenes': Object.assign({}, getOrders_1.default),
    '/carrito/compra/new/{userId}': Object.assign({}, compra_1.default),
    '/ordenes/{id}': Object.assign({}, getOrder_1.default),
    '/ordenes/create/{userId}': Object.assign({}, createOrder_1.default),
};
