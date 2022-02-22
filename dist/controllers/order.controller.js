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
}
exports.orderController = new OrderController();
