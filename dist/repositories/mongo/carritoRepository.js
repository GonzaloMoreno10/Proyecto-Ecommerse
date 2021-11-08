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
exports.mongoCarritoRepository = exports.CarritoRepository = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoDbConnect_1 = __importDefault(require("../../config/mongoDbConnect"));
const productRepository_1 = require("./productRepository");
const carritosSchema = new mongoose_1.default.Schema({
    timestamp: Date,
    productos: [
        {
            _id: Number,
            nombre: String,
            precio: Number,
            stock: Number,
            codigo: Number,
            foto: String,
            descripcion: String,
        },
    ],
});
class CarritoRepository {
    constructor() {
        (0, mongoDbConnect_1.default)(this.srv);
        this.carritos = mongoose_1.default.model('carritos', carritosSchema);
    }
    findProductsOnCart() {
        return __awaiter(this, void 0, void 0, function* () {
            let carrito = yield this.carritos.find();
            return carrito[0].productos;
        });
    }
    findProductsOnCartById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let carrito = yield this.carritos.find();
            let productos = carrito[0].productos;
            //console.log(productos);
            for (let i in productos) {
                if (productos[i] !== null) {
                    if (productos[i]._id.equals(id)) {
                        return productos[i];
                    }
                }
            }
        });
    }
    deleteProductsOnCart(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let carrito = yield this.carritos.find();
            let cart = carrito[0];
            let productos = cart.productos;
            for (let i = 0; i < productos.length; i++) {
                if (productos[i] !== null) {
                    if (productos[i]._id.equals(id)) {
                        if (productos.length > 1) {
                            productos.splice(i, 1);
                            console.log(productos);
                            cart.productos = productos;
                        }
                        else {
                            cart.productos = [];
                        }
                    }
                }
            }
            return yield this.carritos.findByIdAndUpdate(carrito[0].id, cart);
        });
    }
    addProductsToCart(idProducto) {
        return __awaiter(this, void 0, void 0, function* () {
            let carrito = yield this.carritos.find();
            let producto = yield productRepository_1.mongoProductRepository.findById(idProducto);
            let productos = carrito[0].productos;
            productos.push(producto);
            carrito[0].productos = productos;
            return yield this.carritos.findByIdAndUpdate(carrito[0].id, carrito[0]);
        });
    }
}
exports.CarritoRepository = CarritoRepository;
exports.mongoCarritoRepository = new CarritoRepository();
