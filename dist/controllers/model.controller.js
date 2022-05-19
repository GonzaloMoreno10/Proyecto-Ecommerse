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
exports.modeloController = void 0;
const model_repository_1 = require("../repositories/model.repository");
class ModeloController {
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { marcaId } = req.params;
            if (!marcaId) {
                let modelos = yield model_repository_1.modeloRepository.getModelos();
                return res.status(200).json(modelos);
            }
            else {
                let modelos = yield model_repository_1.modeloRepository.getModelosByMarca(parseInt(marcaId));
                return res.status(200).json(modelos);
            }
        });
    }
    setModelo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { marcaId, nombre } = req.body;
            if (!marcaId || !nombre) {
                return res.status(400).json('Invalid body');
            }
            let result = yield model_repository_1.modeloRepository.createModel({ marcaId, nombre });
            const toReturn = yield model_repository_1.modeloRepository.getModelosById(Object.assign(result).insertId);
            return res.status(200).json(toReturn);
        });
    }
}
exports.modeloController = new ModeloController();
