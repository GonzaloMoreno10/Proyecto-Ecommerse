"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carrito_route_1 = __importDefault(require("./carrito.route"));
//import carritoRoute from './carrito.route';
const producto_route_1 = __importDefault(require("./producto.route"));
const router = express_1.Router();
router.use("/productos", producto_route_1.default);
router.use("/carrito", carrito_route_1.default);
exports.default = router;
