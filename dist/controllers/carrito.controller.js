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
exports.carritoController = void 0;
const mongo_1 = require("../repositories/mongo");
const MailStructure_1 = require("../utils/MailStructure");
const twilio_1 = require("../services/twilio");
class CarritoController {
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { userId } = req.params;
                if (userId !== 'null') {
                    if (req.params.idProducto) {
                        let { idProducto } = req.params;
                        let data = yield mongo_1.mongoCarritoRepository.findProductsOnCartById(idProducto, userId);
                        if (data) {
                            res.status(200).json(data);
                        }
                        else {
                            res.status(404).json('Producto no existente en el carrito');
                        }
                    }
                    else {
                        let existUser = yield mongo_1.mongoUserRepository.findById(userId);
                        if (existUser) {
                            let cart = yield mongo_1.mongoCarritoRepository.findCartByUser(userId);
                            if (!cart)
                                yield mongo_1.mongoCarritoRepository.createCart(cart._id);
                            let productos = yield mongo_1.mongoCarritoRepository.findProductsOnCart(userId);
                            let conteo = 0;
                            let cantidad = 0;
                            for (let i in productos) {
                                conteo += productos[i].precioTotal ? productos[i].precioTotal : productos[i].precio;
                                cantidad++;
                            }
                            let total = conteo.toFixed(2);
                            res.status(200).json({ productos, total });
                        }
                        else {
                            res.status(404).json('Usuario no encontrado');
                        }
                    }
                }
                else {
                    return null;
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
                let { userId } = req.params;
                let { idProducto } = req.params;
                let existeCarrito = yield mongo_1.mongoCarritoRepository.findCartByUser(userId);
                let existProd = yield mongo_1.mongoProductRepository.findById(idProducto);
                if (!existProd) {
                    return res.status(404).json('Producto no existente');
                }
                if (!existeCarrito) {
                    yield mongo_1.mongoCarritoRepository.createCart(userId);
                }
                let existInCart = yield mongo_1.mongoCarritoRepository.findProductsOnCartById(idProducto, userId);
                if (existInCart) {
                    return res.status(404).json('Producto existente en el carrito');
                }
                yield mongo_1.mongoCarritoRepository.addProductsToCart(idProducto, userId);
                return res.status(201).json('Producto agregado al carrito');
            }
            catch (err) {
                return res.status(500).json(err);
            }
        });
    }
    compra(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //let user = Object.assign(req.user);
            let { userId } = req.params;
            let usuario = yield mongo_1.mongoUserRepository.findById(userId);
            let carrito = yield mongo_1.mongoCarritoRepository.findCartByUser(userId);
            let products = yield mongo_1.mongoCarritoRepository.findProductsOnCart(userId);
            let suma = 0;
            for (let i in products) {
                suma += products[i].precio;
            }
            let total = suma.toFixed(3);
            try {
                //Comentado por que alcance la cuota limite de email
                //await GmailService.sendEmail(usuario.email, 'Nueva compra', compra(products, usuario, total));
                carrito.productos = [];
                yield twilio_1.SmsService.sendMessage('+543548574529', 'Se recibio tu pedido y lo estamos procesando');
                yield twilio_1.SmsService.sendWhatSapp('+5493548574529', (0, MailStructure_1.compraWhatSapp)(products, usuario, total));
                yield mongo_1.mongoCarritoRepository.vaciarCarrito(userId);
                return res.status(201).json('ok');
            }
            catch (err) {
                return res.status(500).json(err);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { userId } = req.params;
            let { idProducto } = req.params;
            try {
                let prod = yield mongo_1.mongoProductRepository.findById(idProducto);
                if (prod) {
                    let product = yield mongo_1.mongoCarritoRepository.findProductsOnCartById(idProducto, userId);
                    if (product) {
                        yield mongo_1.mongoCarritoRepository.deleteProductsOnCart(idProducto, userId);
                        return res.status(202).json('Producto eliminado');
                    }
                    else {
                        return res.status(404).json('El producto no se encuentra en el carrito');
                    }
                }
                else {
                    return res.status(404).json('Producto no existente');
                }
            }
            catch (err) {
                return res.status(500).json(err);
            }
        });
    }
}
exports.carritoController = new CarritoController();
