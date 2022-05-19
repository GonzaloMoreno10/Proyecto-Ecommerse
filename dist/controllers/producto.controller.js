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
const productRepository_1 = require("../repositories/mysql/productRepository");
const propertiesRepository_1 = require("../repositories/mysql/propertiesRepository");
const venv_1 = require("../constantes/venv");
const marcaModeloLineaRepository_1 = require("../repositories/mysql/marcaModeloLineaRepository");
class ProductoController {
    getRelatedProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.query;
                const result = yield productRepository_1.mysqlProductRepository.getRelatedProducts(Number(id));
                res.status(200).json(result);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    getProductsByOrdersUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const result = yield productRepository_1.mysqlProductRepository.getProductsByLastOrdersUser(parseInt(userId));
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
                const result = yield productRepository_1.mysqlProductRepository.getOffers();
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
                let products = yield productRepository_1.mysqlProductRepository.getProductsByProductType(parseInt(productType));
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
                    const finalArray = [];
                    let product = yield productRepository_1.mysqlProductRepository.getProductsById(parseInt(id));
                    if (product[0]) {
                        let prop = {};
                        let properties = yield productRepository_1.mysqlProductRepository.findProductProperties(parseInt(id));
                        properties.forEach(property => {
                            const propertyName = property.propertyName;
                            if (!prop[propertyName])
                                prop[propertyName] = [];
                            prop[propertyName].push(property);
                        });
                        for (let i in prop) {
                            const subProperties = [];
                            for (const j in prop[i]) {
                                subProperties.push({
                                    subPropertyId: prop[i][j].ppsiId,
                                    subPropertyName: prop[i][j].subPropertyName,
                                    ppvId: prop[i][j].ppvId,
                                    value: prop[i][j].value,
                                });
                            }
                            const properties = {
                                propertyId: prop[i][0].ppId,
                                isGeneric: prop[i][0].isGeneric,
                                propertyName: prop[i][0].propertyName,
                                subProperties,
                            };
                            finalArray.push(properties);
                        }
                        product[0].properties = finalArray;
                    }
                    product ? res.json(product) : res.status(404).json('Product not found');
                }
                else {
                    res.status(400).json('Invalid Field: id');
                    console.log('id');
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
                const result = yield productRepository_1.mysqlProductRepository.findProductsByMarca(parseInt(id));
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
                    let product = yield productRepository_1.mysqlProductRepository.getProductsBySellerUser(parseInt(userId), parseInt(activo));
                    if (product[0]) {
                        let prop = {};
                        let properties = yield productRepository_1.mysqlProductRepository.findProductProperties(parseInt(product[0].id));
                        properties.forEach(property => {
                            const propertyName = property.propertyName;
                            if (!prop[propertyName])
                                prop[propertyName] = [];
                            prop[propertyName].push(property);
                        });
                        for (let i in prop) {
                            const subProperties = [];
                            for (const j in prop[i]) {
                                subProperties.push({
                                    subPropertyId: prop[i][j].ppsiId,
                                    subPropertyName: prop[i][j].subPropertyName,
                                    ppvId: prop[i][j].ppvId,
                                    value: prop[i][j].value,
                                });
                            }
                            const properties = {
                                propertyId: prop[i][0].ppId,
                                isGeneric: prop[i][0].isGeneric,
                                propertyName: prop[i][0].propertyName,
                                subProperties,
                            };
                            finalArray.push(properties);
                        }
                        product[0].properties = finalArray;
                    }
                    product ? res.json(product) : res.status(404).json('Product not found');
                }
                else {
                    res.status(400).json('Invalid Field: id');
                    console.log('id');
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
                    const productos = yield productRepository_1.mysqlProductRepository.getProductsQuery({ categoria: categoriaId });
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
                const { categoria, nombre, minPrice, maxPrice, codigo, minStock, maxStock, marca, productType } = req.query;
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
                if (marca)
                    query.marca = Number(marca);
                if (productType)
                    query.productType = Number(marca);
                let data = yield productRepository_1.mysqlProductRepository.getProductsQuery(query);
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
                let { nombre, descripcion, codigo, foto, precio, stock, categoria, productType, marca, modelo, linea, userId, properties, isOferta, descuento, fotos, } = req.body;
                const marcaModeloLinea = { marcaId: marca, modeloId: modelo, lineaId: linea };
                //let cat = await categoriaRepository.getCategoriasById(categoria);
                //if (cat) {
                const marcaModeloLineaId = yield marcaModeloLineaRepository_1.marcaModeloLineaRepository.setMarcaModeloLinea(marcaModeloLinea);
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
                const result = yield productRepository_1.mysqlProductRepository.setProduct(producto);
                if (result) {
                    if (properties) {
                        for (const i in properties) {
                            const propertie = {
                                productId: result,
                                productPropertieValueId: properties[i],
                            };
                            yield propertiesRepository_1.propertiesRepository.setProductPresentationProperty(propertie);
                        }
                    }
                    const producto = yield productRepository_1.mysqlProductRepository.getProductPresentationById(result);
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
                let prod = yield productRepository_1.mysqlProductRepository.getProductsById(parseInt(id));
                if (prod) {
                    let data = yield productRepository_1.mysqlProductRepository.updateProduct(producto, parseInt(id));
                    let productToRes = yield productRepository_1.mysqlProductRepository.getProductsById(parseInt(id));
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
                const products = yield productRepository_1.mysqlProductRepository.findByKeyWord(search);
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
                let prod = yield productRepository_1.mysqlProductRepository.getProductsById(id);
                if (prod) {
                    yield propertiesRepository_1.propertiesRepository.deletePropertiesByProduct(id);
                    yield productRepository_1.mysqlProductRepository.deleteProduct(id);
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
            console.log(file.originalname);
            //const { productId } = req.params;
            //console.log(productId);
            let dir = '';
            if (venv_1.HEROKU) {
                dir = `https://ecommerce-be-01.herokuapp.com/storage/imgs/${file.originalname}.jpg`;
            }
            else {
                dir = `http://localhost:3000/storage/imgs/${file.originalname}.jpg`;
            }
            console.log(dir);
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
