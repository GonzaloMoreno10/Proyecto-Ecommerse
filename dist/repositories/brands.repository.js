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
exports.marcasRepository = void 0;
const sequelize_1 = require("../datasource/sequelize");
class MarcaRepository {
    getBrands() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield sequelize_1.BrandModel.findAll();
            return result;
        });
    }
    getBrandsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield sequelize_1.BrandModel.findOne({ where: { BraId: id } });
            return result;
        });
    }
    setBrand(marca) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield sequelize_1.BrandModel.create(marca);
            return result;
        });
    }
    getBrandsByCategoryId(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = sequelize_1.BrandModel.findAll({
                include: [
                    {
                        model: sequelize_1.ProductTypeModel,
                        where: { categoryId: categoryId },
                        required: true,
                        attributes: [],
                    },
                ],
            });
            return result;
        });
    }
    getBrandsByProductType(productType) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield sequelize_1.BrandModel.findAll({
                include: [
                    {
                        model: sequelize_1.ProductTypeModel,
                        required: true,
                        where: { id: productType },
                        attributes: [],
                    },
                ],
            });
            return result;
        });
    }
}
exports.marcasRepository = new MarcaRepository();
