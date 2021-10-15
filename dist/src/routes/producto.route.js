"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const controllers_1 = require("../controllers");
const cors_1 = __importDefault(require("cors"));
const router = express_1.Router();
router.use(cors_1.default());
router.get("/", express_async_handler_1.default(controllers_1.productoController.get));
router.get("/:id", express_async_handler_1.default(controllers_1.productoController.getById));
router.put("/:id", express_async_handler_1.default(controllers_1.productoController.actualizar));
router.post("/", express_async_handler_1.default(controllers_1.productoController.agregar));
router.delete("/:id", express_async_handler_1.default(controllers_1.productoController.borrar));
router.get("/vista/1", express_async_handler_1.default(controllers_1.productoController.vista));
exports.default = router;
