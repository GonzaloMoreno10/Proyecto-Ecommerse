"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.get('/:id?', passport_1.default.authenticate('jwt', { session: false }), controllers_1.orderController.getOrders);
router.post('/create/:userId', passport_1.default.authenticate('jwt', { session: false }), controllers_1.orderController.create);
exports.default = router;
