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
exports.mysqlCategoriaRepository = void 0;
const sequelize_1 = require("../datasource/sequelize");
const mysql_service_1 = require("../services/mysql.service");
class ProductRepository {
    constructor() {
        this.connection = mysql_service_1.mysqlDataSource.connection();
    }
    getCategorias() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = sequelize_1.CategoryModel.findAll();
            return result;
        });
    }
    getCategoriasById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield sequelize_1.CategoryModel.findOne({ where: { CatId: id } });
                return result;
            }
            catch (err) {
                console.log(err);
                return err;
            }
        });
    }
    setCategoria(categoria) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = sequelize_1.CategoryModel.create(categoria);
        });
    }
    getCategoriaByNombre(nombre) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield sequelize_1.CategoryModel.findOne({ where: { CatName: nombre } });
                return result;
            }
            catch (err) {
                return err;
            }
        });
    }
    deleteCategoria(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield sequelize_1.CategoryModel.findOne({ where: { CatId: id } });
            if (category) {
                category.enabled = false;
            }
            const result = yield sequelize_1.CategoryModel.update(category, { where: { CatId: id } });
            return result;
        });
    }
}
exports.mysqlCategoriaRepository = new ProductRepository();
