"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const controllers_1 = require("../controllers");
const cors_1 = __importDefault(require("cors"));
const router = (0, express_1.Router)();
router.use((0, cors_1.default)());
router.get("/", (0, express_async_handler_1.default)(controllers_1.productoController.get));
router.get("/:id", (0, express_async_handler_1.default)(controllers_1.productoController.getById));
router.put("/:id", (0, express_async_handler_1.default)(controllers_1.productoController.actualizar));
router.post("/", (0, express_async_handler_1.default)(controllers_1.productoController.agregar));
router.delete("/:id", (0, express_async_handler_1.default)(controllers_1.productoController.borrar));
router.get("/vista/1", (0, express_async_handler_1.default)(controllers_1.productoController.vista));
exports.default = router;
