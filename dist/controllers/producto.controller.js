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
const categoria_repository_1 = require("../repositories/mongo/categoria.repository");
class ProductoController {
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { id } = req.params;
                if (id) {
                    let product = yield mongo_1.mongoProductRepository.findById(id);
                    product ? res.json(product) : res.status(404).json('Product not found');
                }
                else {
                    res.status(400).json('Invalid Field: ID');
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    findByCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { categoriaId } = req.params;
            try {
                if (categoriaId) {
                    const productos = yield mongo_1.mongoProductRepository.findByCategory(categoriaId);
                    return res.status(200).json(productos);
                }
                else {
                    return res.status(400).json('Invalid params');
                }
            }
            catch (err) {
                return res.status(500).json(err);
            }
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { categoria, nombre, minPrice, maxPrice, codigo, minStock, maxStock } = req.query;
                const query = {};
                if (nombre)
                    query.nombre = nombre.toString();
                if (codigo)
                    query.codigo = Number(codigo);
                if (minPrice)
                    query.minPrice = Number(minPrice);
                if (maxPrice)
                    query.maxPrice = Number(maxPrice);
                if (minStock)
                    query.minStock = Number(minStock);
                if (maxStock)
                    query.maxStock = Number(maxStock);
                if (categoria)
                    query.categoria = categoria.toString();
                let data = yield mongo_1.mongoProductRepository.query(query);
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
                let cat = yield categoria_repository_1.categoriaRepository.getCategoriasById(categoria.toString());
                if (cat) {
                    let result = yield mongo_1.mongoProductRepository.create(producto);
                    return res.status(200).json(result);
                }
                else {
                    res.status(400).json('Categoria no existente');
                }
            }
            catch (err) {
                console.log(err);
                return res.status(500).json(err);
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
                let prod = yield mongo_1.mongoProductRepository.findById(id);
                if (prod) {
                    let data = yield mongo_1.mongoProductRepository.update(id, producto);
                    let productToRes = yield mongo_1.mongoProductRepository.findById(id);
                    res.status(200).json({ result: 'Producto Actualizado', productToRes });
                }
                else {
                    res.status(400).json('Producto no encontrado');
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
                let prod = yield mongo_1.mongoProductRepository.findById(id);
                if (prod) {
                    yield mongo_1.mongoProductRepository.delete(id);
                    res.status(202).json({
                        msg: 'producto borrado',
                    });
                }
                else {
                    res.status(400).json('Producto no encontrado');
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
exports.ProductoController = ProductoController;
exports.productoController = new ProductoController();
