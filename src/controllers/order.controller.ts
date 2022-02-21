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
        order.aproved.map(item => {
          orderPrice += item.precioTotal;
        });
        order.precioOrden = orderPrice;
      });
      return res.json(ordenes);
    }
  }
}

export const orderController = new OrderController();
