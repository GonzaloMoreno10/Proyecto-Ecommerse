"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const modelo_controller_1 = require("../controllers/modelo.controller");
const router = (0, express_1.Router)();
router.get('/:marcaId?', modelo_controller_1.modeloController.get);
router.post('/', modelo_controller_1.modeloController.setModelo);
exports.default = router;
