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
const product_repository_1 = require("../repositories/product.repository");
const properties_repository_1 = require("../repositories/properties.repository");
const venv_1 = require("../constants/venv");
const brandModelLine_repository_1 = require("../repositories/brandModelLine.repository");
const constructResponse_1 = require("../utils/constructResponse");
class ProductoController {
    getRelatedProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.query;
                const result = yield product_repository_1.mysqlProductRepository.getRelatedProducts(Number(id));
                return (0, constructResponse_1.constructResponse)(122, res, result);
            }
            catch (err) {
                console.log(err);
                return res.status(200).json((0, constructResponse_1.constructResponse)(200, null, err));
            }
        });
    }
    getProductsByOrdersUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const result = yield product_repository_1.mysqlProductRepository.getProductsByLastOrdersUser(parseInt(userId));
                res.status(200).json(result);
            }
            catch (err) {
                console.log(err);
                return res.status(400).json(err);
            }
        });
    }
    getOffers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield product_repository_1.mysqlProductRepository.getOffers();
                return res.status(200).json(result);
            }
            catch (err) {
                console.log(err);
                return res.status(400).json(err);
            }
        });
    }
    getProductsByProductType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { productType } = req.params;
                let products = yield product_repository_1.mysqlProductRepository.getProductsByProductType(parseInt(productType));
                return res.status(200).json(products);
            }
            catch (err) {
                return res.status(400).json(err);
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { id } = req.params;
                if (id) {
                    let product = yield product_repository_1.mysqlProductRepository.getProductsById(parseInt(id));
                    if (product) {
                        console.log(product.ProId);
                        const properties = yield properties_repository_1.propertiesRepository.getPropertiesByProductId(product.ProId);
                        Object.assign(product).dataValues.PPPROs = properties;
                        return (0, constructResponse_1.constructResponse)(121, res, product);
                    }
                    else {
                        return (0, constructResponse_1.constructResponse)(123, res);
                    }
                }
                else {
                    const error = {
                        code: 500,
                        message: 'Invalid product id',
                    };
                    res.status(400).json((0, constructResponse_1.constructResponse)(400, null, error));
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    getProductsByMarca(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id) {
                    return res.status(400).json({ message: 'Bad Request' });
                }
                const result = yield product_repository_1.mysqlProductRepository.findProductsByMarca(parseInt(id));
                return res.status(200).json(result);
            }
            catch (err) {
                console.log(err);
                return err;
            }
        });
    }
    getBySellerUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { userId, activo } = req.params;
                if (userId) {
                    const finalArray = [];
                    let product = yield product_repository_1.mysqlProductRepository.getProductsBySellerUser(parseInt(userId), parseInt(activo));
                    product ? res.json(product) : res.status(404).json('Product not found');
                }
                else {
                    res.status(400).json('Invalid user id');
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
                    const productos = yield product_repository_1.mysqlProductRepository.getProductsByCategoryId(parseInt(categoriaId));
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
                const result = yield product_repository_1.mysqlProductRepository.getProducts();
                return (0, constructResponse_1.constructResponse)(122, res, result);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    agregar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { nombre, descripcion, codigo, foto, precio, stock, categoria, productType, marca, modelo, linea, userId, properties, isOferta, descuento, fotos, } = req.body;
                const marcaModeloLinea = {
                    BmlBraId: marca,
                    BmlModId: modelo,
                    BmlLinId: linea,
                    createdUser: res.locals.userData.id,
                };
                //let cat = await categoriaRepository.getCategoriasById(categoria);
                //if (cat) {
                const marcaModeloLineaId = yield brandModelLine_repository_1.marcaModeloLineaRepository.setBrandModelLine(marcaModeloLinea);
                const producto = {
                    nombre,
                    descripcion,
                    codigo,
                    foto,
                    precio,
                    userId,
                    stock,
                    categoria,
                    productTypeId: productType,
                    isOferta,
                    descuento,
                    marcaId: marca,
                    marcaModeloLineaId,
                    properties,
                    fotos,
                };
                const result = yield product_repository_1.mysqlProductRepository.setProduct(producto);
                if (result) {
                    if (properties) {
                        for (const i in properties) {
                            const propertie = {
                                PreProId: result,
                                PreValId: properties[i],
                                createdUser: res.locals.userData.id,
                            };
                            yield properties_repository_1.propertiesRepository.setProductPresentationProperty(propertie);
                        }
                    }
                    const producto = yield product_repository_1.mysqlProductRepository.getProductsById(result);
                    const prop = yield properties_repository_1.propertiesRepository.getPropertiesByProductId(producto.ProId);
                    Object.assign(producto).dataValues.properties = prop;
                    return res.status(200).json(producto);
                }
                // } else {
                //res.status(400).json('Categoria no existente');
                //}
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
                let { nombre, descripcion, codigo, foto, precio, stock, categoria, productType, marca } = req.body;
                let producto = {
                    nombre,
                    descripcion,
                    codigo,
                    foto,
                    precio,
                    stock,
                    categoria,
                    productTypeId: productType,
                    marcaId: marca,
                };
                let prod = yield product_repository_1.mysqlProductRepository.getProductsById(parseInt(id));
                if (prod) {
                    let data = yield product_repository_1.mysqlProductRepository.updateProduct(producto, parseInt(id));
                    let productToRes = yield product_repository_1.mysqlProductRepository.getProductsById(parseInt(id));
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
    find(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { search } = req.params;
            try {
                const products = yield product_repository_1.mysqlProductRepository.findByKeyWord(search);
                res.status(200).json(products);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    borrar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = parseInt(req.params.id);
                let prod = yield product_repository_1.mysqlProductRepository.getProductsById(id);
                if (prod) {
                    yield properties_repository_1.propertiesRepository.deletePropertiesByProduct(id);
                    yield product_repository_1.mysqlProductRepository.deleteProduct(id);
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
    setImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //const { fileName } = req.params;
            const { file } = req;
            //const { productId } = req.params;
            //console.log(productId);
            let dir = '';
            if (venv_1.HEROKU) {
                dir = `https://ecommerce-be-01.herokuapp.com/storage/imgs/${file.originalname}.jpg`;
            }
            else {
                dir = `http://localhost:3000/storage/imgs/${file.originalname}.jpg`;
            }
            //console.log(product);
            //product.foto = dir;
            try {
                //await mysqlProductRepository.updatePicture(parseInt(productId), dir);
                //const updateProduct = await mysqlProductRepository.getProductsById(parseInt(productId));
                return res.status(200).json(dir);
            }
            catch (err) {
                return res.json(err);
            }
        });
    }
}
exports.ProductoController = ProductoController;
exports.productoController = new ProductoController();
