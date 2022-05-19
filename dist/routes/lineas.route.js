"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const linea_controller_1 = require("../controllers/linea.controller");
const router = (0, express_1.Router)();
router.get('/:modeloId?', linea_controller_1.lineasController.get);
router.post('/', linea_controller_1.lineasController.setLinea);
exports.default = router;
