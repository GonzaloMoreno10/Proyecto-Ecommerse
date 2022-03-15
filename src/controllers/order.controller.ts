import { Request, Response } from 'express';
import { IOrder } from '../interface/orden.interface';
import { mongoCarritoRepository, mongoUserRepository, orderRepository } from '../repositories/mongo';
import { mysqlOrderRepository } from '../repositories/mysql/ordersRepository';
class OrderController {
  async setOrder(req: Request, res: Response) {
    const { products, userId } = req.body;

    if (!userId || !products) {
      return res.status(400).json('Bad request');
    }
    try {
      const order = await mysqlOrderRepository.createOrder(userId);

      const orderProducts = await mysqlOrderRepository.createOrderProducts(Object.assign(order).insertId, products);

      return res.status(200).json({ id: Object.assign(order).insertId });
    } catch (err) {
      console.log(err);
    }
  }

  async getOrdersByUser(req: Request, res: Response) {
    let { userId } = req.params;
    try {
      const result = await mysqlOrderRepository.getOrdersByUser(parseInt(userId));
      let orders = {};
      result.forEach((order: IOrder) => {
        const orderId = 'order' + order.id;
        if (!orders[orderId]) orders[orderId] = [];
        orders[orderId].push(order);
      });

      const finalArray = [];
      for (let i in orders) {
        let total = 0;
        orders[i].forEach(element => {
          total += element.precio;
        });
        const orden: IOrder = {
          id: orders[i][0].id,
          price: total,
          userId: orders[i][0].userId,
          created_at: orders[i][0].created_at,
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
            price: orders[i][j].precio,
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
  }

  async getOrders(req: Request, res: Response) {
    let { id } = req.params;
    if (id) {
      let order = await mysqlOrderRepository.getOrderById(parseInt(id));
      if (order) {
        let total = 0;

        order.map(or => {
          total += or.precio;
          return total;
        });

        const orderConvert = Object.assign(order);
        const op = orderConvert.map(order => {
          const opr = {
            id: order.opId,
            estado: order.opEstado,
            quantity: order.quantity,
            productid: order.productId,
            title: order.nombre,
            price: order.precio,
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
        const orden: IOrder = {
          id: orderConvert[0].id,
          price: total,
          userId: orderConvert[0].userId,
          created_at: orderConvert[0].created_at,
          estado: orderConvert[0].estado,
          orderProducts: op,
        };
        return res.json(orden);
      }
    } else {
      let ordenes = await mysqlOrderRepository.getOrders();
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
  }
}

export const orderController = new OrderController();
