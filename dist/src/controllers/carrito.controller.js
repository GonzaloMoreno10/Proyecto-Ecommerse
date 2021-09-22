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
const api_1 = require("../apis/api");
class CarritoController {
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('entre al controlador de carrito');
                if (req.params.idProducto) {
                    let idProducto = req.params.idProducto;
                    let data = yield api_1.api.find(idProducto);
                    if (data) {
                        res.status(200).json({ data: data });
                    }
                    else {
                        res.status(400).json({ data: "No se encontro el producto" });
                    }
                }
                else {
                    let productos = yield api_1.api.find();
                    if (productos) {
                        res.status(200).json({ producto: productos });
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
                let idProd = req.params.idProd;
                //let prod = await carritoRepo.findProductsOnCartById(idProd);
                if (idProd) {
                    let data = yield api_1.api.add(idProd);
                    if (data) {
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
            let idProducto = req.params.idProducto;
            try {
                let data = yield api_1.api.delete(idProducto);
                if (data) {
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
