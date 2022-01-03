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
exports.productoController = exports.ProductoController = void 0;
const mongo_1 = require("../repositories/mongo");
class ProductoController {
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.params.id;
                let product = yield mongo_1.mongoProductRepository.findById(id);
                res.json(product);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = yield mongo_1.mongoProductRepository.findAll();
                res.json(data);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    agregar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { nombre, descripcion, codigo, foto, precio, stock, categoria } = req.body;
                let producto = {
                    nombre,
                    descripcion,
                    codigo,
                    foto,
                    precio,
                    stock,
                    categoria,
                };
                let result = yield mongo_1.mongoProductRepository.create(producto);
                return res.status(200).json(result);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.params.id;
                let { nombre, descripcion, codigo, foto, precio, stock, categoria } = req.body;
                let producto = {
                    nombre,
                    descripcion,
                    codigo,
                    foto,
                    precio,
                    stock,
                    categoria,
                };
                if (producto) {
                    let prod = yield mongo_1.mongoProductRepository.findById(id);
                    let data = yield mongo_1.mongoProductRepository.update(id, producto);
                    res.status(200).json({ producto: 'Producto Actualizado', data });
                }
            }
            catch (err) {
                return res.json(err);
            }
        });
    }
    borrar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.params.id;
                yield mongo_1.mongoProductRepository.delete(id);
                res.status(202).json({
                    msg: 'producto borrado',
                });
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
exports.ProductoController = ProductoController;
exports.productoController = new ProductoController();
