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
const productRepository_1 = require("./productRepository");
const carrito_model_1 = __importDefault(require("../../models/carrito.model"));
class CarritoRepository {
    constructor() {
        this.carritos = carrito_model_1.default;
    }
    findProductsOnCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let carrito = yield this.findCartByUser(userId);
            return carrito.productos;
        });
    }
    findProductsOnCartById(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let carrito = yield this.findCartByUser(userId);
            let productos = carrito.productos;
            for (let i in productos) {
                if (productos[i] !== null) {
                    if (productos[i]._id.equals(id)) {
                        return productos[i];
                    }
                }
            }
        });
    }
    vaciarCarrito(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let carrito = yield this.findCartByUser(userId);
            carrito.productos = [];
            yield this.carritos.findByIdAndUpdate(carrito._id, carrito);
        });
    }
    deleteProductsOnCart(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let cart = yield this.findCartByUser(userId);
            let productos = cart.productos;
            for (let i = 0; i < productos.length; i++) {
                if (productos[i] !== null) {
                    if (productos[i]._id.equals(id)) {
                        if (productos.length > 1) {
                            productos.splice(i, 1);
                            cart.productos = productos;
                        }
                        else {
                            cart.productos = [];
                        }
                    }
                }
            }
            return yield this.carritos.findByIdAndUpdate(cart._id, cart);
        });
    }
    addProductsToCart(idProducto, cantidad, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let carrito = yield this.findCartByUser(userId);
            let producto = yield productRepository_1.mongoProductRepository.findById(idProducto);
            let productos = carrito.productos;
            const productOnCart = {
                _id: producto._id,
                nombre: producto.nombre,
                descripcion: producto.descripcion,
                codigo: producto.codigo,
                foto: producto.foto,
                precio: producto.precio,
                stock: producto.stock,
                categoria: producto.categoria,
                cantidad: cantidad,
                precioTotal: producto.precio * cantidad,
            };
            productos.push(productOnCart);
            carrito.productos = productos;
            return yield this.carritos.findByIdAndUpdate(carrito._id, carrito);
        });
    }
    findCartByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let carrito = yield this.carritos.findOne({ userId: userId });
            return carrito ? carrito : null;
        });
    }
    createCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let carrito = {
                userId: userId,
                timestamp: new Date(),
                productos: [],
            };
            yield this.carritos.create(carrito);
        });
    }
}
exports.CarritoRepository = CarritoRepository;
exports.mongoCarritoRepository = new CarritoRepository();
