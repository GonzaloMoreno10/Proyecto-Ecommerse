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
const orders_repository_1 = require("../repositories/orders.repository");
const product_repository_1 = require("../repositories/product.repository");
class OrderController {
    setOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { products, userId } = req.body;
            if (!userId || !products) {
                return res.status(400).json('Bad request');
            }
            try {
                const ids = [];
                for (let i in products) {
                    ids.push(products[i].productId);
                }
                const prods = yield product_repository_1.mysqlProductRepository.findByIds(ids);
                const errors = [];
                for (const i in products) {
                    for (const j in prods) {
                        if (products[i].productId === prods[j].id) {
                            const stock = prods[j].stock - products[i].quantity;
                            products[i].price = prods[i].isOferta
                                ? prods[i].precio - Math.floor((prods[i].descuento * prods[i].precio) / 100)
                                : prods[i].precio;
                            if (stock >= 0) {
                                prods[j].stock = prods[j].stock - products[i].quantity;
                            }
                            else {
                                errors.push({ code: 'stock', error: 'Sin stock suficiente', product: prods[i] });
                            }
                        }
                    }
                }
                if (!errors.length) {
                    const order = yield orders_repository_1.mysqlOrderRepository.createOrder(userId);
                    yield orders_repository_1.mysqlOrderRepository.createOrderProducts(Object.assign(order).insertId, products);
                    for (let i in prods) {
                        if (prods[i].stock >= 0) {
                            yield product_repository_1.mysqlProductRepository.updateProduct(prods[i], prods[i].id);
                        }
                    }
                    return res.status(200).json({ id: Object.assign(order).insertId });
                }
                console.log(errors);
                return res.status(errors.length ? 400 : 200).json({ errors: errors });
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    getOrdersByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = res.locals.userData;
            try {
                const result = yield orders_repository_1.mysqlOrderRepository.getOrdersByUser(parseInt(userData.userId));
                res.status(200).json(result);
            }
            catch (err) {
                console.log(err);
                return err;
            }
        });
    }
    getOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = res.locals.userData;
            const { id } = req.params;
            try {
                const result = yield orders_repository_1.mysqlOrderRepository.getOrdersByUser(parseInt(userData.userId), parseInt(id));
                res.status(200).json(result);
            }
            catch (err) {
                console.log(err);
                return err;
            }
        });
    }
}
exports.orderController = new OrderController();
