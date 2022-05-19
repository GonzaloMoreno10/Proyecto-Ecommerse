"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stats_controller_1 = require("../controllers/stats.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.get('/:productId', auth_middleware_1.tokenOrApiKeyIsValid, stats_controller_1.statsController.isMostSelled);
exports.default = router;
