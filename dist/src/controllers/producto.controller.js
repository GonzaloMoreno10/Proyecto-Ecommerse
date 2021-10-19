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
const api_1 = require("../apis/api");
class ProductoController {
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.params.id;
                let data = yield api_1.api.getProducts(id);
                if (data) {
                    res.status(200).json(data);
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
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('Pidieron en get');
                let data = yield api_1.api.getProducts();
                if (data) {
                    if (data.length > 0) {
                        res.status(200).json(data);
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
                let producto = {
                    nombre,
                    descripcion,
                    codigo,
                    foto,
                    precio,
                    stock,
                };
                let result = yield api_1.api.addProduct(producto);
                if (result) {
                    res.status(200).json({ producto: result });
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
                    let prod = yield api_1.api.getProducts(id);
                    // console.log(prod);
                    if (prod) {
                        let data = yield api_1.api.updateProduct(id, producto);
                        res.status(200).json({ producto: "Producto Actualizado", data });
                    }
                    else {
                        res.status(500).json({ data: "No se encontro el producto" });
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
            let productos = yield api_1.api.query(options);
            res.json(productos);
        });
    }
    borrar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.params.id;
                yield api_1.api.deleteProduct(id);
                res.json({
                    msg: "producto borrado",
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
