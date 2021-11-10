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
exports.carritoController = void 0;
const express_1 = __importDefault(require("express"));
const Router = express_1.default.Router();
const mongo_1 = require("../repositories/mongo");
const MailStructure_1 = require("../utils/MailStructure");
const gmail_1 = require("../services/gmail");
const twilio_1 = require("../services/twilio");
class CarritoController {
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = Object.assign(req.user);
                if (req.params.idProducto) {
                    let idProducto = req.params.idProducto;
                    let data = yield mongo_1.mongoCarritoRepository.findProductsOnCartById(idProducto, user._id);
                    console.log(data);
                    if (data) {
                        res.json(data);
                    }
                    else {
                        res.json('nada');
                    }
                }
                else {
                    let cart = yield mongo_1.mongoCarritoRepository.findCartByUser(user._id);
                    if (!cart)
                        yield mongo_1.mongoCarritoRepository.createCart(user._id);
                    let productos = yield mongo_1.mongoCarritoRepository.findProductsOnCart(user._id);
                    let conteo = 0;
                    let cantidad = 0;
                    for (let i in productos) {
                        conteo += productos[i].precio;
                        cantidad++;
                    }
                    let total = conteo.toFixed(2);
                    if (productos) {
                        res.render('carritos/allCarrito', { productos, total, cantidad });
                    }
                    else {
                        res.render('carritos/allCarrito');
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
                let user = Object.assign(req.user);
                let existeCarrito = yield mongo_1.mongoCarritoRepository.findCartByUser(user._id);
                if (!existeCarrito) {
                    yield mongo_1.mongoCarritoRepository.createCart(user._id);
                }
                let idProd = req.params.idProd;
                let existInCart = yield mongo_1.mongoCarritoRepository.findProductsOnCartById(idProd, user._id);
                if (existInCart) {
                    req.flash('error_msg', 'El producto ya esta en el carrito');
                    return res.redirect('/api/carrito');
                }
                let existsProd = yield mongo_1.mongoProductRepository.findById(idProd);
                if (existsProd) {
                    yield mongo_1.mongoCarritoRepository.addProductsToCart(idProd, user._id);
                    req.flash('success_msg', 'Producto agregado al carrito');
                    res.redirect('/api/productos');
                }
                else {
                    req.flash('error_msg', 'Ocurrio un error');
                    res.redirect('/api/productos');
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    compra(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = Object.assign(req.user);
            let usuario = yield mongo_1.mongoUserRepository.findById(user._id);
            let carrito = yield mongo_1.mongoCarritoRepository.findCartByUser(user._id);
            let products = yield mongo_1.mongoCarritoRepository.findProductsOnCart(user._id);
            let suma = 0;
            for (let i in products) {
                suma += products[i].precio;
            }
            let total = suma.toFixed(3);
            yield gmail_1.GmailService.sendEmail(usuario.email, 'Nueva compra', (0, MailStructure_1.compra)(products, usuario, total));
            carrito.productos = [];
            yield twilio_1.SmsService.sendMessage('+543548574529', 'Se recibio tu pedido y lo estamos procesando');
            yield twilio_1.SmsService.sendWhatSapp('+5493548574529', (0, MailStructure_1.compraWhatSapp)(products, usuario, total));
            yield mongo_1.mongoCarritoRepository.vaciarCarrito(user._id);
            req.flash('success_msg', 'Pedido Realizado correctamente');
            res.redirect('/api/productos');
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = Object.assign(req.user);
            let idProducto = req.params.idProducto;
            try {
                let prod = yield mongo_1.mongoProductRepository.findById(idProducto);
                if (prod) {
                    yield mongo_1.mongoCarritoRepository.deleteProductsOnCart(idProducto, user._id);
                    req.flash('success_msg', 'Producto removido del carrito');
                    res.redirect('/api/carrito');
                }
                else {
                    req.flash('error_msg', 'Ocurrio un problema');
                    res.redirect('/api/carrito');
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
exports.carritoController = new CarritoController();
