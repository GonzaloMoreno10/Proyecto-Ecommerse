"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cors_1 = __importDefault(require("cors"));
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.use((0, cors_1.default)());
router.post('/login', auth_controller_1.authContrroller.login);
router.get('/logout', auth_middleware_1.tokenOrApiKeyIsValid, (req, res) => {
    req.session.destroy(() => { });
});
exports.default = router;
