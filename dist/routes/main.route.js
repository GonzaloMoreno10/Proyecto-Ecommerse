"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orders_route_1 = __importDefault(require("./orders.route"));
const carrito_route_1 = __importDefault(require("./carrito.route"));
const producto_route_1 = __importDefault(require("./producto.route"));
const categoria_routes_1 = __importDefault(require("./categoria.routes"));
const users_route_1 = __importDefault(require("./users.route"));
const serverConfig_route_1 = __importDefault(require("./serverConfig.route"));
const mensajes_route_1 = __importDefault(require("./mensajes.route"));
const auth_route_1 = __importDefault(require("./auth.route"));
const router = (0, express_1.Router)();
router.use('/products', producto_route_1.default);
router.use('/cart', carrito_route_1.default);
router.use('/users', users_route_1.default);
router.use('/orders', orders_route_1.default);
router.use('/categories', categoria_routes_1.default);
router.use('/server', serverConfig_route_1.default);
router.use('/messages', mensajes_route_1.default);
router.use('/auth', auth_route_1.default);
exports.default = router;
