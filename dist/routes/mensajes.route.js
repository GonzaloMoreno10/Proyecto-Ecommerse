"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const mensaje_controller_1 = require("../controllers/mensaje.controller");
const router = (0, express_1.Router)();
router.get('/:email', passport_1.default.authenticate('jwt', { session: false }), mensaje_controller_1.mensajesController.getByEmail);
exports.default = router;
