"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carrito_controller_1 = require("../controllers/carrito.controller");
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
router.post(`/`, passport_1.default.authenticate('jwt', { session: false }), carrito_controller_1.carritoController.compra);
exports.default = router;
