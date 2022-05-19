"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const statsController_1 = require("../controllers/statsController");
const router = (0, express_1.Router)();
router.get('/:productId', statsController_1.statsController.isMostSelled);
exports.default = router;
