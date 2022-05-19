"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const model_controller_1 = require("../controllers/model.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.get('/:marcaId?', auth_middleware_1.tokenOrApiKeyIsValid, model_controller_1.modeloController.get);
router.post('/', auth_middleware_1.tokenOrApiKeyIsValid, model_controller_1.modeloController.setModelo);
exports.default = router;
