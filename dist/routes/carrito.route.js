"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = express_1.Router();
router.get("/listar/:idProducto?", controllers_1.carritoController.findById);
router.post("/agregar/:idProd", controllers_1.carritoController.agregar);
router.delete("/eliminar/:idProducto", controllers_1.carritoController.delete);
exports.default = router;
