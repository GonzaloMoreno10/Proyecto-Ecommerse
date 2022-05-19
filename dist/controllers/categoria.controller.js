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
const categoriaRepository_1 = require("../repositories/mysql/categoriaRepository");
class CategoriaController {
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                if (!id) {
                    let categorias = yield categoriaRepository_1.mysqlCategoriaRepository.getCategorias();
                    return res.status(200).json(categorias);
                }
                else {
                    let categoria = yield categoriaRepository_1.mysqlCategoriaRepository.getCategoriasById(parseInt(id));
                    return res.status(200).json(categoria);
                }
            }
            catch (err) {
                return res.status(400).json(err);
            }
        });
    }
    getCategoriesByName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { nombre } = req.params;
            if (!nombre) {
                return res.status(400).json({ msg: 'Invalid body' });
            }
            try {
                let result = yield categoriaRepository_1.mysqlCategoriaRepository.getCategoriaByNombre(nombre);
                return res.status(200).json(result);
            }
            catch (err) {
                return res.status(400).json({ msg: err });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { nombre, image } = req.body;
            let categoria = {
                nombre: nombre,
            };
            let result = yield categoriaRepository_1.mysqlCategoriaRepository.setCategoria(categoria);
            return res.status(201).json(result);
        });
    }
}
exports.categoriaController = new CategoriaController();
