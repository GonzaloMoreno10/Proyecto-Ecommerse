'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.orderController = void 0;
const ordersRepository_1 = require('../repositories/mysql/ordersRepository');
const productRepository_1 = require('../repositories/mysql/productRepository');
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
        const prods = yield productRepository_1.mysqlProductRepository.findByIds(ids);
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
              } else {
                errors.push({ code: 'stock', error: 'Sin stock suficiente', product: prods[i] });
              }
            }
          }
        }
        if (!errors.length) {
          const order = yield ordersRepository_1.mysqlOrderRepository.createOrder(userId);
          console.log(products);
          yield ordersRepository_1.mysqlOrderRepository.createOrderProducts(Object.assign(order).insertId, products);
          for (let i in prods) {
            if (prods[i].stock >= 0) {
              yield productRepository_1.mysqlProductRepository.updateProduct(prods[i], prods[i].id);
            }
          }
          return res.status(200).json({ id: Object.assign(order).insertId });
        }
        console.log(errors);
        return res.status(errors.length ? 400 : 200).json({ errors: errors });
      } catch (err) {
        console.log(err);
      }
    });
  }
  getOrdersByUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      let { userId } = req.params;
      try {
        const result = yield ordersRepository_1.mysqlOrderRepository.getOrdersByUser(parseInt(userId));
        let orders = {};
        result.forEach(order => {
          const orderId = 'order' + order.id;
          if (!orders[orderId]) orders[orderId] = [];
          orders[orderId].push(order);
        });
        const finalArray = [];
        for (let i in orders) {
          let total = 0;
          orders[i].forEach(element => {
            total += element.price * element.quantity;
          });
          const orden = {
            id: orders[i][0].id,
            price: total,
            userId: orders[i][0].userId,
            createdAt: orders[i][0].createdAt,
            estado: orders[i][0].estado,
          };
          const orderProducts = [];
          for (let j in orders[i]) {
            const opr = {
              id: orders[i][j].opId,
              estado: orders[i][j].opEstado,
              quantity: orders[i][j].quantity,
              productid: orders[i][j].productId,
              title: orders[i][j].nombre,
              price: orders[i][j].price,
              stock: orders[i][j].stock,
              codigo: orders[i][j].codigo,
              image: orders[i][j].foto,
              categoria: orders[i][j].categoria,
              marca_id: orders[i][j].marca_id,
              descripcion: orders[i][j].descripcion,
              product_type_id: orders[i][j].product_type_id,
            };
            orderProducts.push(opr);
            orden.orderProducts = orderProducts;
          }
          finalArray.push(orden);
        }
        res.status(200).json(finalArray);
      } catch (err) {
        console.log(err);
        return err;
      }
    });
  }
  getOrders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      let { id } = req.params;
      if (id) {
        let order = yield ordersRepository_1.mysqlOrderRepository.getOrderById(parseInt(id));
        if (order) {
          let total = 0;
          order.map(or => {
            total += or.price * or.quantity;
            return total;
          });
          console.log(total);
          const orderConvert = Object.assign(order);
          const op = orderConvert.map(order => {
            const opr = {
              id: order.opId,
              estado: order.opEstado,
              quantity: order.quantity,
              productid: order.productId,
              title: order.nombre,
              price: order.price,
              stock: order.stock,
              codigo: order.codigo,
              image: order.foto,
              categoria: order.categoria,
              marca_id: order.marca_id,
              descripcion: order.descripcion,
              product_type_id: order.product_type_id,
            };
            return opr;
          });
          const orden = {
            id: orderConvert[0].id,
            price: total,
            userId: orderConvert[0].userId,
            createdAt: orderConvert[0].createdAt,
            estado: orderConvert[0].estado,
            orderProducts: op,
          };
          return res.json(orden);
        }
      } else {
        let ordenes = yield ordersRepository_1.mysqlOrderRepository.getOrders();
        // ordenes.map(order => {
        //   let orderPrice = 0;
        //   order.items.map(item => {
        //     orderPrice += item.precioTotal;
        //   });
        //   order.precioOrden = orderPrice;
        // });
        //console.log(ordenes);
        return res.json(ordenes);
      }
    });
  }
}
exports.orderController = new OrderController();
