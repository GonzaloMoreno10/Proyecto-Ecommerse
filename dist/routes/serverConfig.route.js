"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const serverConfig_controller_1 = require("../controllers/serverConfig.controller");
const router = (0, express_1.Router)();
router.get('/info', serverConfig_controller_1.serverConfigController.getServerInfo);
exports.default = router;
