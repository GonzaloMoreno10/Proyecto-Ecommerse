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
exports.orderController = void 0;
const mongo_1 = require("../repositories/mongo");
class OrderController {
    getOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = req.params;
            if (id) {
                let order = yield mongo_1.orderRepository.findOrdersById(id);
                if (order) {
                    let orderPrice = 0;
                    order.items.map(item => {
                        orderPrice += item.precioTotal;
                    });
                    order.precioOrden = orderPrice;
                    return res.json(order);
                }
            }
            else {
                let ordenes = yield mongo_1.orderRepository.findAll();
                ordenes.map(order => {
                    let orderPrice = 0;
                    order.items.map(item => {
                        orderPrice += item.precioTotal;
                    });
                    order.precioOrden = orderPrice;
                });
                return res.json(ordenes);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { userId } = req.params;
            const productos = yield mongo_1.mongoCarritoRepository.findProductsOnCart(userId);
            const user = yield mongo_1.mongoUserRepository.findById(userId);
            console.log(user);
            const orders = yield mongo_1.orderRepository.findAll();
            let nroOrden = orders.length + 1;
            let precioOrden = 0;
            const timestamp = new Date();
            const estado = 1;
            productos.map(item => {
                precioOrden += item.precioTotal;
            });
            let order = {
                items: productos,
                nroOrden,
                timestamp,
                estado,
                email: user.email,
                userId,
                precioOrden,
            };
            let orden = yield mongo_1.orderRepository.createOrder(order);
            return res.json(orden);
        });
    }
}
exports.orderController = new OrderController();
