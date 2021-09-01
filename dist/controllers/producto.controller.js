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
exports.productoController = void 0;
const models_1 = require("../models");
const repositorios_1 = require("../repositorios");
class ProductoController {
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = parseInt(req.params.id);
                let data = yield repositorios_1.productoRepository.getProductosById(id);
                if (data) {
                    res.status(200).json({ producto: data });
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
    ;
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = yield repositorios_1.productoRepository.getProductos();
                if (data) {
                    if (data.length > 0) {
                        res.status(200).json({ producto: data });
                    }
                    else {
                        res.status(400).json({ data: "No existen productos" });
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
                let { nombre, descripcion, codigo, foto, precio, stock } = req.body;
                let producto = new models_1.Producto(0, new Date(), nombre, descripcion, codigo, foto, precio, stock, undefined);
                let result = yield repositorios_1.productoRepository.guardar(producto);
                if (result == 1) {
                    res.status(200).json({ data: "Producto guardado" });
                }
                else {
                    res.status(500).json({ data: "Algo fallo" });
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = parseInt(req.params.id);
                let { nombre, descripcion, codigo, foto, precio, stock } = req.body;
                let producto = new models_1.Producto(id, new Date(), nombre, descripcion, codigo, foto, precio, stock, undefined);
                if (producto) {
                    let data = yield repositorios_1.productoRepository.actualizar(id, producto);
                    if (data) {
                        res.status(200).json({ producto: "Producto Actualizado", data });
                    }
                    else {
                        res.status(500).json({ data: "No se encontro el producto" });
                    }
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
    ;
    borrar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = parseInt(req.params.id);
                let producto = yield repositorios_1.productoRepository.getProductosById(id);
                let data = yield repositorios_1.productoRepository.borrar(id);
                if (data) {
                    res.status(200).json({ data: "Producto Eliminado", producto });
                }
                else {
                    res.status(500).json({ data: "No se encontro el producto" });
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
exports.productoController = new ProductoController();
