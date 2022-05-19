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
exports.marcaModeloLineaRepository = void 0;
const sequelize_1 = require("../datasource/sequelize");
class MarcaModeloLineaRepository {
    getBrandModelLine() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield sequelize_1.BrandModelLineModel.findAll();
            return result;
        });
    }
    getBrandModelLineById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield sequelize_1.BrandModelLineModel.findOne({ where: { BmlId: id } });
            return result;
        });
    }
    setBrandModelLine(mmm) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = sequelize_1.BrandModelLineModel.create(mmm);
            return result;
        });
    }
}
exports.marcaModeloLineaRepository = new MarcaModeloLineaRepository();
