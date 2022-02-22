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
            const { carrito, userId } = req.body;
            let hasError = false;
            let suma = 0;
            for (let i in carrito) {
                suma += carrito[i].price;
            }
            const user = yield mongo_1.mongoUserRepository.findById(userId);
            const orders = yield mongo_1.orderRepository.findAll();
            const timestamp = new Date();
            let nroOrden = orders.length + 1;
            const prods = [];
            for (let i in carrito) {
                prods.push(yield mongo_1.mongoProductRepository.findById(carrito[i].id));
            }
            for (let i in prods) {
                if (prods[i].stock >= carrito[i].quantity) {
                    prods[i] = carrito[i];
                    prods[i].stock = carrito[i].originalStock - carrito[i].quantity;
                    yield mongo_1.mongoProductRepository.update(prods[i].id, prods[i]);
                }
                else {
                    hasError = true;
                    const stock = prods[i].stock;
                    prods[i] = carrito[i];
                    prods[i].disaproved = true;
                    prods[i].stock = stock;
                }
            }
            let order = {
                items: prods,
                nroOrden,
                timestamp,
                estado: 1,
                email: user.email,
                userId,
                precioOrden: suma,
            };
            if (!hasError) {
                let orden = yield mongo_1.orderRepository.createOrder(order);
                return res.status(200).json(orden);
            }
            else {
                res.json(order);
            }
            //Comentado por que alcance la cuota limite de email
            //await GmailService.sendEmail(usuario.email, 'Nueva compra', compra(products, usuario, total));
            //carrito.productos = [];
            // await SmsService.sendMessage('+543548574529', 'Se recibio tu pedido y lo estamos procesando');
            // await SmsService.sendWhatSapp('+5493548574529', compraWhatSapp(carrito, userId, suma.toString()));
            // await mongoCarritoRepository.vaciarCarrito(userId);
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
