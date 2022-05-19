"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_controller_1 = require("../controllers/index.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.get('/:id?', auth_middleware_1.tokenOrApiKeyIsValid, index_controller_1.orderController.getOrders);
router.post('/', auth_middleware_1.tokenOrApiKeyIsValid, index_controller_1.orderController.setOrder);
exports.default = router;
