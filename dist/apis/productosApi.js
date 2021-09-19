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
exports.productsAPI = void 0;
const DAOs_factory_1 = require("../config/DAOs.factory");
const persistencias_1 = require("../constantes/persistencias");
/**
 * Con esta variable elegimos el tipo de persistencia
 */
const tipo = persistencias_1.tipoPersistencias.FS;
class prodAPI {
    constructor() {
        this.productos = DAOs_factory_1.ProductFactoryDAO.get(tipo);
    }
    getProducts(id = undefined) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id) {
                return this.productos.findById(id);
            }
            return this.productos.findAll();
        });
    }
    addProduct(productData) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProduct = yield this.productos.create(productData);
            return newProduct;
        });
    }
    updateProduct(id, productData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.productos.update(id, productData);
            return productData;
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.productos.delete(id);
        });
    }
}
exports.productsAPI = new prodAPI();
