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
exports.productTypeController = void 0;
const productType_repository_1 = require("../repositories/productType.repository");
class ProductTypeController {
    getProductTypeByName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.params;
                const result = yield productType_repository_1.productTypeRepository.getProductTypesByName(name);
                res.status(200).json(result);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    getProductTypeByid(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { productTypeId } = req.params;
                const result = yield productType_repository_1.productTypeRepository.getProductTypeById(parseInt(productTypeId));
                res.status(200).json(result);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    getproductTypeByCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { categoryId } = req.params;
                const result = yield productType_repository_1.productTypeRepository.getProductTypesByCategory(parseInt(categoryId));
                res.status(200).json(result);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    setProductType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { categoryId, nombre, image } = req.body;
                const result = yield productType_repository_1.productTypeRepository.setProductType({ categoryId, nombre, image });
                res.status(200).json({ id: Object.assign(result).insertId });
            }
            catch (err) {
                console.log(err);
                return res.status(400).json(err);
            }
        });
    }
    getProductTypes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield productType_repository_1.productTypeRepository.getProductTypes();
                res.status(200).json(result);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
exports.productTypeController = new ProductTypeController();
