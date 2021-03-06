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
exports.lineasController = void 0;
const line_repository_1 = require("../repositories/line.repository");
class LineaController {
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { modeloId } = req.params;
            if (!modeloId) {
                let lineas = yield line_repository_1.lineasRepository.getLineas();
                return res.status(200).json(lineas);
            }
            else {
                let lineas = yield line_repository_1.lineasRepository.getLineasByModelo(parseInt(modeloId));
                return res.status(200).json(lineas);
            }
        });
    }
    setLinea(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { modeloId, nombre } = req.body;
            if (!modeloId || !nombre) {
                return res.status(400).json('Invalid body');
            }
            else {
                try {
                    let linea = yield line_repository_1.lineasRepository.setLinea({ modeloId, nombre });
                    const toReturn = yield line_repository_1.lineasRepository.getLineaById(Object.assign(linea).insertId);
                    return res.status(200).json(toReturn);
                }
                catch (err) {
                    console.log(err);
                }
            }
        });
    }
}
exports.lineasController = new LineaController();
