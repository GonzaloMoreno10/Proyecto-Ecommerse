"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoria_controller_1 = require("../controllers/categoria.controller");
const router = (0, express_1.Router)();
router.get('/:id?', categoria_controller_1.categoriaController.get);
router.post('/', categoria_controller_1.categoriaController.create);
router.get('/nombre/:nombre', categoria_controller_1.categoriaController.getCategoriesByName);
exports.default = router;
