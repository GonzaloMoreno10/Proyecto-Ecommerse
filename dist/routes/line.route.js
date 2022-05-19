"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const lines_controller_1 = require("../controllers/lines.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.get('/:modeloId?', auth_middleware_1.tokenOrApiKeyIsValid, lines_controller_1.lineasController.get);
router.post('/', auth_middleware_1.tokenOrApiKeyIsValid, lines_controller_1.lineasController.setLinea);
exports.default = router;
