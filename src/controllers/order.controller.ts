import { Request, Response } from 'express';
import { mongoCarritoRepository, mongoUserRepository, orderRepository } from '../repositories/mongo';
import { Orden } from '../interface/orden.interface';
class OrderController {
  async getOrdersByUser(req: Request, res: Response) {
    let { userId } = req.params;
    try {
      const result = await orderRepository.findOrdersByUser(userId);
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return err;
    }
  }

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
}

export const orderController = new OrderController();
