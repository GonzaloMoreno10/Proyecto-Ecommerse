import { Request, Response } from 'express';
import { orderRepository } from '../repositories/mongo';
import { compra, compraWhatSapp } from '../utils/MailStructure';
import { GmailService } from '../services/gmail';
import { SmsService } from '../services/twilio';
import { Orden } from '../interface/orden.interface';
class OrderController {
  async getOrdersByUser(req: Request, res: Response) {
    let { userId } = req.params;
    let orders = await orderRepository.findOrdersByUser(userId);

    orders.map(order => {
      let orderPrice = 0;
      order.items.map(item => {
        orderPrice += item.precioTotal;
      });
      order.precioOrden = orderPrice;
    });
    return res.json(orders);
  }

  async create(req: Request, res: Response) {
    let { items, userId, email } = req.body;
    const orders = await orderRepository.findAll();
    let nroOrden = orders.length + 1;
    let precioOrden = 0;
    const timestamp = new Date();
    const estado = 1;
    items.map(item => {
      precioOrden += item.precioTotal;
    });
    let order: Orden = {
      items,
      nroOrden,
      timestamp,
      estado,
      email,
      userId,
      precioOrden,
    };
    let orden = await orderRepository.createOrder(order);
    return res.json(orden);
  }
}

export const orderController = new OrderController();
