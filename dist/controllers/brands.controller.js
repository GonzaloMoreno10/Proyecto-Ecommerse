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
exports.marcasController = void 0;
const brands_repository_1 = require("../repositories/brands.repository");
class MarcasController {
    getMarcas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield brands_repository_1.marcasRepository.getBrands();
                res.status(200).json(result);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    getMarcasByProductType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { productType } = req.params;
                const result = yield brands_repository_1.marcasRepository.getBrandsByProductType(parseInt(productType));
                res.status(200).json(result);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    getMarcasByCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { categoryId } = req.params;
                const result = yield brands_repository_1.marcasRepository.getBrandsByCategoryId(parseInt(categoryId));
                return res.status(200).json(result);
            }
            catch (err) {
                console.log(err);
                return res.status(500).json(err);
            }
        });
    }
    setMarca(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { productTypeId, name, img } = req.body;
                if (!productTypeId || !name) {
                    return res.status(400).json('Invalid body');
                }
                const brand = {
                    BraName: name,
                    BraTypId: productTypeId,
                    createdUser: res.locals.userData.id,
                };
                const result = yield brands_repository_1.marcasRepository.setBrand(brand);
                const toReturn = yield brands_repository_1.marcasRepository.getBrandsById(Object.assign(result).insertId);
                res.status(200).json(toReturn);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
exports.marcasController = new MarcasController();
