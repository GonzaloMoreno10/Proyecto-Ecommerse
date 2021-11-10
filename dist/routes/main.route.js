"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const carrito_route_1 = __importDefault(require("./carrito.route"));
//import carritoRoute from './carrito.route';
const producto_route_1 = __importDefault(require("./producto.route"));
const users_route_1 = __importDefault(require("./users.route"));
const router = (0, express_1.Router)();
router.use('/productos', producto_route_1.default);
router.use('/carrito', auth_1.auth, carrito_route_1.default);
router.use('/users', users_route_1.default);
exports.default = router;
