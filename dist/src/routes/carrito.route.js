"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carrito_controller_1 = require("../controllers/carrito.controller");
const router = express_1.Router();
router.get("/:idProducto?", carrito_controller_1.carritoController.findById);
router.post("/:idProd", carrito_controller_1.carritoController.agregar);
router.delete("/:idProducto", carrito_controller_1.carritoController.delete);
exports.default = router;
