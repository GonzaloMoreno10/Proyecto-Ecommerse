"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../controllers/users.controller");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const router = express_1.Router();
router.get('/:id?', express_async_handler_1.default(users_controller_1.userController.getUsers));
exports.default = router;
