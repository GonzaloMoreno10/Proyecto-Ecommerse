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
const express_1 = __importDefault(require("express"));
const repositorios_1 = require("../repositorios");
const Router = express_1.default.Router();
//qwdqwdasdw
let carritoRepo = new repositorios_1.CarritoRepository();
let prodRepo = new repositorios_1.ProductoRepository();
Router.get("/listar/:idProducto?", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (request.params.idProducto) {
            let idProducto = parseInt(request.params.idProducto);
            let data = yield carritoRepo.getProductosById(idProducto);
            if (data !== -1) {
                response.status(200).json({ data: data });
            }
            else {
                response.status(400).json({ data: "No se encontro el producto" });
            }
        }
        else {
            let productos = yield carritoRepo.getProductos();
            if (productos !== -1) {
                response.status(200).json({ producto: productos.carrito });
            }
            else {
                response.status(400).json({ Producto: "No se encontro el producto" });
            }
        }
    }
    catch (err) {
        console.log(err);
    }
}));
Router.post("/agregar/:idProd", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let idProd = parseInt(request.params.idProd);
        let prod = yield prodRepo.getProductosById(idProd);
        if (prod) {
            let data = yield carritoRepo.guardarProducto(prod);
            if (data !== -1) {
                response.status(200).json({ data: data });
            }
            else {
                response.status(400).json({ data: "Ocurrio un error" });
            }
        }
        else {
            response.status(400).json({ data: "El producto no existe" });
        }
    }
    catch (err) {
        console.log(err);
    }
}));
Router.delete("/borrar/:idProducto", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let idProducto = parseInt(request.params.idProducto);
    try {
        let data = yield carritoRepo.borrar(idProducto);
        if (data !== -1) {
            response.status(200).json({ data: data });
        }
        else {
            response.status(400).json({ data: "No se encontro el producto" });
        }
    }
    catch (err) {
        console.log(err);
    }
}));
exports.default = Router;
