"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const serverConfig_controller_1 = require("../controllers/serverConfig.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.get('/info', auth_middleware_1.tokenOrApiKeyIsValid, serverConfig_controller_1.serverConfigController.getServerInfo);
exports.default = router;
