"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriaController = void 0;
const categoria_repository_1 = require("../repositories/mongo/categoria.repository");
class CategoriaController {
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let categorias = yield categoria_repository_1.categoriaRepository.getAllCategorias();
            return res.status(200).json(categorias);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { nombre } = req.body;
            let categoria = {
                nombre: nombre,
            };
            let result = yield categoria_repository_1.categoriaRepository.createCategoria(categoria);
            return res.status(201).json(result);
        });
    }
}
exports.categoriaController = new CategoriaController();
