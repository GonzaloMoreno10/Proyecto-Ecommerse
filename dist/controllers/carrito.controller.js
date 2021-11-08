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
exports.carritoController = void 0;
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
const mongo_1 = require("../repositories/mongo");
class CarritoController {
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.params.idProducto) {
                    let idProducto = req.params.idProducto;
                    let data = yield mongo_1.mongoCarritoRepository.findProductsOnCartById(idProducto);
                    if (data) {
                        res.json(data);
                    }
                    else {
                        res.status(400).json({ data: 'No se encontro el producto' });
                    }
                }
                else {
                    let productos = yield mongo_1.mongoCarritoRepository.findProductsOnCart();
                    let total = 0;
                    for (let i in productos) {
                        total += productos[i].precio;
                    }
                    if (productos) {
                        res.json(productos);
                    }
                    else {
                        res.status(400).json({ Producto: 'No se encontro el producto' });
                    }
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    agregar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('Entre en post carrito');
                let idProd = req.params.idProd;
                let existInCart = yield mongo_1.mongoCarritoRepository.findProductsOnCartById(idProd);
                let existsProd = yield mongo_1.mongoProductRepository.findById(idProd);
                if (existsProd) {
                    if (!existInCart) {
                        yield mongo_1.mongoCarritoRepository.addProductsToCart(idProd);
                        res.json(1);
                    }
                    else {
                        res.status(203).json(-1);
                    }
                }
                else {
                    res.status(400).json(-2);
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let idProducto = req.params.idProducto;
            try {
                let prod = yield mongo_1.mongoProductRepository.findById(idProducto);
                if (prod) {
                    yield mongo_1.mongoCarritoRepository.deleteProductsOnCart(idProducto);
                    res.json('Producto removido del carrito');
                }
                else {
                    res.json({ data: 'Producto no existente en el carrito' });
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
exports.carritoController = new CarritoController();
