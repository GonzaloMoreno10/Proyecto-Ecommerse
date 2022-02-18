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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoProductRepository = void 0;
const producto_model_1 = __importDefault(require("../../models/producto.model"));
class ProductRepository {
    constructor() {
        this.productos = producto_model_1.default;
    }
    //mongodb+srv://admin:<password>@cluster0.6d6g8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let products = [];
            products = yield this.productos.find();
            return products;
        });
    }
    findByCategory(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            let productos = yield this.productos.find({ categoria: categoryId });
            return productos;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let productos = yield this.productos.findById(id.toString());
                return productos;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data.nombre || !data.precio)
                throw new Error('invalid data');
            const newProduct = new this.productos(data);
            let res = yield newProduct.save();
            return res;
        });
    }
    update(id, newProductData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let productos = yield this.productos.findByIdAndUpdate(id.toString(), newProductData);
                return productos;
            }
            catch (err) {
                console.log(err);
                return null;
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.productos.findByIdAndDelete(id.toString());
        });
    }
    query(options) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = {};
            if (options.nombre)
                query.nombre = options.nombre;
            if (options.minPrice && options.maxPrice)
                query.minPrice > options.minPrice && query.maxPrice < options.maxPrice;
            if (options.minStock && options.maxStock)
                query.minPrice > options.minPrice && query.maxPrice < options.maxPrice;
            if (options.codigo)
                query.codigo = options.codigo;
            if (options.categoria)
                query.categoria = options.categoria;
            return this.productos.find(query);
        });
    }
}
exports.mongoProductRepository = new ProductRepository();
