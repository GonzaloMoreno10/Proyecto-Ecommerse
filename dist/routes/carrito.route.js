"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const method_override_1 = __importDefault(require("method-override"));
const carrito_controller_1 = require("../controllers/carrito.controller");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.use((0, method_override_1.default)(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));
router.post('/compra/new', carrito_controller_1.carritoController.compra);
router.get('/:idProducto?', auth_1.auth, carrito_controller_1.carritoController.findById);
router.post('/:idProd', auth_1.auth, carrito_controller_1.carritoController.agregar);
router.delete('/:idProducto', auth_1.auth, carrito_controller_1.carritoController.delete);
exports.default = router;
