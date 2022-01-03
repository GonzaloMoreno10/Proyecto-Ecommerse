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
    getOrdersByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { userId } = req.params;
            let orders = yield mongo_1.orderRepository.findOrdersByUser(userId);
            orders.map(order => {
                let orderPrice = 0;
                order.items.map(item => {
                    console.log(item.precioTotal);
                    orderPrice += item.precioTotal;
                });
                order.precioOrden = orderPrice;
            });
            return res.json(orders);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { items, userId, email } = req.body;
            const orders = yield mongo_1.orderRepository.findAll();
            let nroOrden = orders.length + 1;
            let precioOrden = 0;
            const timestamp = new Date();
            const estado = 1;
            items.map(item => {
                precioOrden += item.precioTotal;
            });
            let order = {
                items,
                nroOrden,
                timestamp,
                estado,
                email,
                userId,
                precioOrden,
            };
            let orden = yield mongo_1.orderRepository.createOrder(order);
            return res.json(orden);
        });
    }
}
exports.orderController = new OrderController();
