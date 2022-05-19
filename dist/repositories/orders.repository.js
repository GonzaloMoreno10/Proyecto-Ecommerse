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
exports.mysqlOrderRepository = void 0;
const sequelize_1 = require("../datasource/sequelize");
const mysql_service_1 = require("../services/mysql.service");
class OrderRepository {
    constructor() {
        this.connection = mysql_service_1.mysqlDataSource.connection();
    }
    getOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `select o.id,u.id as userId,o.createdAt,o.estado, op.id as opId, op.estado as opEstado, op.quantity , p.id as productId,p.nombre,p.precio,p.stock,p.codigo,p.foto,p.categoria,p.marca_id,p.descripcion ,p.product_type_id from orders o
    join orderProducts op on op.orderId = o.id
    join products p on p.id = op.productId
    join users u on u.id = o.userId`;
            const result = yield this.connection.query(query);
            return result[0];
        });
    }
    getOrdersByUser(userId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const whereClause = { userId: userId };
            if (id) {
                whereClause.id = id;
            }
            const res = yield sequelize_1.OrderModel.findAll({
                where: whereClause,
                attributes: {
                    include: [
                        [sequelize_1.sequelize.literal(`(select sum(price) from orderProducts op where op.orderId = Order.id )`), 'price'],
                    ],
                },
                include: [
                    {
                        model: sequelize_1.OrderProductsModel,
                        required: true,
                        include: [
                            {
                                model: sequelize_1.ProductModel,
                                attributes: {
                                    include: [
                                        [
                                            sequelize_1.sequelize.literal(`(select price from orderProducts op where op.orderId = Order.id and op.productId = ${'`'}OrderProducts->Product${'`'}.id )`),
                                            'price',
                                        ],
                                    ],
                                },
                                required: true,
                            },
                        ],
                    },
                ],
            });
            return res;
        });
    }
    getOrderById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `select o.id,u.id as userId,o.createdAt,o.estado,op.price, op.id as opId, op.estado as opEstado, op.quantity , p.id as productId,p.nombre,p.precio,p.stock,p.codigo,p.foto,p.categoria,p.marca_id,p.descripcion ,p.product_type_id from orders o
      join orderProducts op on op.orderId = o.id
      join products p on p.id = op.productId
      join users u on u.id = o.userId
      where o.id = ${id}`;
            const result = yield this.connection.query(query);
            return result[0];
        });
    }
    createOrder(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `insert into orders (estado,userId) values(1,${userId})`;
            const result = yield this.connection.query(query);
            return result[0];
        });
    }
    createOrderProducts(orderId, products) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let query = 'insert into orderProducts (orderId,productId,quantity,price) values';
                for (let i in products) {
                    query += `(${orderId},${products[i].OrpProId},${products[i].OrpQuantity},${products[i].OrpPrice})`;
                    if (parseInt(i) < products.length - 1) {
                        query += ',';
                    }
                    else {
                        query += ';';
                    }
                }
                const res = yield this.connection.query(query);
                return res;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
exports.mysqlOrderRepository = new OrderRepository();
