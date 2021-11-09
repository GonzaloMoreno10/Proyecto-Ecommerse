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
const method_override_1 = __importDefault(require("method-override"));
const router = (0, express_1.Router)();
router.use((0, method_override_1.default)(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));
router.use('/productos', producto_route_1.default);
router.use('/carrito', auth_1.auth, carrito_route_1.default);
router.use('/users', users_route_1.default);
exports.default = router;
