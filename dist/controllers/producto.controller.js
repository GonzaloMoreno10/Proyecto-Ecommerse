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
                let data = yield mongo_1.mongoProductRepository.findById(id);
                if (data) {
                    res.status(200).json(data);
                }
                else {
                    res.status(400).json({ data: 'No se encontro el producto' });
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('Pidieron en get');
                let data = yield mongo_1.mongoProductRepository.findAll();
                if (data) {
                    if (data.length > 0) {
                        res.status(200).json(data);
                    }
                    else {
                        res.status(400).json({ data: 'No existen productos' });
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
                let producto = {
                    nombre,
                    descripcion,
                    codigo,
                    foto,
                    precio,
                    stock,
                };
                let result = yield mongo_1.mongoProductRepository.create(producto);
                if (result) {
                    res.status(200).json({ producto: result });
                }
                else {
                    res.status(500).json({ data: 'Algo fallo' });
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
                let id = req.params.id;
                let { nombre, descripcion, codigo, foto, precio, stock } = req.body;
                let producto = {
                    nombre,
                    descripcion,
                    codigo,
                    foto,
                    precio,
                    stock,
                };
                if (producto) {
                    let prod = yield mongo_1.mongoProductRepository.findById(id);
                    // console.log(prod);
                    if (prod) {
                        let data = yield mongo_1.mongoProductRepository.update(id, producto);
                        res.status(200).json({ producto: 'Producto Actualizado', data });
                    }
                    else {
                        res.status(500).json({ data: 'No se encontro el producto' });
                    }
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    vista(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { minPrice, maxPrice, minStock, maxStock, nombre, codigo } = req.body;
            let options = { minPrice, maxPrice, minStock, maxStock, nombre, codigo };
            let productos = yield mongo_1.mongoProductRepository.query(options);
            res.json(productos);
        });
    }
    borrar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.params.id;
                yield mongo_1.mongoProductRepository.delete(id);
                res.json({
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
