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
exports.MongoProductsRepository = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const venv_1 = require("../constantes/venv");
const productsSchema = new mongoose_1.default.Schema({
    nombre: String,
    precio: Number,
    stock: Number,
    codigo: Number,
    foto: String,
    descripcion: String,
});
const carritoSchema = new mongoose_1.default.Schema({
    timestamp: Date,
    productos: [{
            nombre: String,
            precio: Number,
            stock: Number,
            codigo: Number,
            foto: String,
            descripcion: String,
        }],
});
class MongoProductsRepository {
    constructor(local = false) {
        if (local)
            this.srv = `mongodb://localhost:27017/${venv_1.Venv.MONGO_DB}`;
        else
            this.srv = `mongodb+srv://${venv_1.Venv.MONGO_ATLAS_USER}:${venv_1.Venv.MONGO_ATLAS_PASSWORD}@${venv_1.Venv.MONGO_ATLAS_CLUSTER}/${venv_1.Venv.MONGO_ATLAS_DB}?retryWrites=true&w=majority`;
        mongoose_1.default.connect(this.srv);
        console.log("Se conecto a atlas");
        this.productos = mongoose_1.default.model("producto", productsSchema);
        this.carrito = mongoose_1.default.model("carrito", carritoSchema);
    }
    //mongodb+srv://admin:<password>@cluster0.6d6g8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let output = [];
            try {
                output = yield this.productos.find();
                return output;
            }
            catch (err) {
                return output;
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let productos = yield this.productos.findById(id.toString());
                console.log(productos);
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
                throw new Error("invalid data");
            const newProduct = new this.productos(data);
            yield newProduct.save();
            return newProduct;
        });
    }
    update(id, newProductData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productos.findByIdAndUpdate(id, newProductData);
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
            console.log("Entre a query");
            console.log(options.nombre);
            if (options.nombre)
                query.nombre = options.nombre;
            if (options.minPrice && options.maxPrice)
                query.minPrice > options.minPrice && query.maxPrice < options.maxPrice;
            if (options.minStock && options.maxStock)
                query.minPrice > options.minPrice && query.maxPrice < options.maxPrice;
            if (options.codigo)
                query.codigo = options.codigo;
            console.log(query);
            return this.productos.find(query);
        });
    }
    addProductsToCart(idProducto) {
        return __awaiter(this, void 0, void 0, function* () {
            let producto = yield this.findById(idProducto.toString());
            if (producto) {
                const newCarrito = new this.carrito(producto);
                yield newCarrito.save();
                return newCarrito;
            }
        });
    }
    findProductsOnCartById() {
        return __awaiter(this, void 0, void 0, function* () {
            return [];
        });
    }
    findProductsOnCart() {
        return __awaiter(this, void 0, void 0, function* () {
            return [];
        });
    }
}
exports.MongoProductsRepository = MongoProductsRepository;
