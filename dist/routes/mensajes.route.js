"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mensaje_controller_1 = require("../controllers/mensaje.controller");
const router = (0, express_1.Router)();
router.get('/:email', mensaje_controller_1.mensajesController.getByEmail);
exports.default = router;
