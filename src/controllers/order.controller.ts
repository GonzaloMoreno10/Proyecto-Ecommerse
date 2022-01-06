import { Request, Response } from 'express';
import { mongoCarritoRepository, mongoUserRepository, orderRepository } from '../repositories/mongo';
import { Orden } from '../interface/orden.interface';
class OrderController {
  async getOrders(req: Request, res: Response) {
    let { id } = req.params;
    if (id) {
      let order = await orderRepository.findOrdersById(id);
      if (order) {
        let orderPrice = 0;
        order.items.map(item => {
          orderPrice += item.precioTotal;
        });
        order.precioOrden = orderPrice;
        return res.json(order);
      }
    } else {
      let ordenes = await orderRepository.findAll();
      ordenes.map(order => {
        let orderPrice = 0;
        order.items.map(item => {
          orderPrice += item.precioTotal;
        });
        order.precioOrden = orderPrice;
      });
      return res.json(ordenes);
    }
  }

  async create(req: Request, res: Response) {
    let { userId } = req.params;
    const productos = await mongoCarritoRepository.findProductsOnCart(userId);
    const user = await mongoUserRepository.findById(userId);
    console.log(user);
    const orders = await orderRepository.findAll();
    let nroOrden = orders.length + 1;
    let precioOrden = 0;
    const timestamp = new Date();
    const estado = 1;
    productos.map(item => {
      precioOrden += item.precioTotal;
    });
    let order: Orden = {
      items: productos,
      nroOrden,
      timestamp,
      estado,
      email: user.email,
      userId,
      precioOrden,
    };
    let orden = await orderRepository.createOrder(order);
    return res.json(orden);
  }
}

export const orderController = new OrderController();
