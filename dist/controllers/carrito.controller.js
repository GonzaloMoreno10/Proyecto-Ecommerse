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
const repositorios_1 = require("../repositorios");
const Router = express_1.default.Router();
class CarritoController {
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.params.idProducto) {
                    let idProducto = parseInt(req.params.idProducto);
                    let data = yield repositorios_1.carritoRepositorio.getProductosById(idProducto);
                    if (data !== -1) {
                        res.status(200).json({ data: data });
                    }
                    else {
                        res.status(400).json({ data: "No se encontro el producto" });
                    }
                }
                else {
                    let productos = yield repositorios_1.carritoRepositorio.getProductos();
                    if (productos !== -1) {
                        res.status(200).json({ producto: productos.carrito });
                    }
                    else {
                        res.status(400).json({ Producto: "No se encontro el producto" });
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
                let idProd = parseInt(req.params.idProd);
                let prod = yield repositorios_1.productoRepository.getProductosById(idProd);
                if (prod) {
                    let data = yield repositorios_1.carritoRepositorio.guardarProducto(prod);
                    if (data !== -1) {
                        res.status(200).json({ data: data });
                    }
                    else {
                        res.status(400).json({ data: "Ocurrio un error" });
                    }
                }
                else {
                    res.status(400).json({ data: "El producto no existe" });
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let idProducto = parseInt(req.params.idProducto);
            try {
                let data = yield repositorios_1.carritoRepositorio.borrar(idProducto);
                if (data !== -1) {
                    res.status(200).json({ data: data });
                }
                else {
                    res.status(400).json({ data: "No se encontro el producto" });
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
exports.carritoController = new CarritoController();
