import { Request, Response } from 'express';
import { orderRepository } from '../repositories/orders.repository';
import { constructResponse } from '../utils/constructResponse';
class OrderController {
  // async setOrder(req: Request, res: Response) {
  //   const { products, userId } = req.body;

  //   if (!userId || !products) {
  //     return res.status(400).json('Bad request');
  //   }
  //   try {
  //     const ids = [];
  //     for (let i in products) {
  //       ids.push(products[i].productId);
  //     }
  //     const prods = await productRepository.getProductsByIds(ids);

  //     const errors = [];
  //     for (const i in products) {
  //       for (const j in prods) {
  //         if (products[i].productId === prods[j].ProId) {
  //           const stock = prods[j].ProStock - products[i].quantity;
  //           products[i].price = prods[i].isOferta
  //             ? prods[i].precio - Math.floor((prods[i].descuento * prods[i].precio) / 100)
  //             : prods[i].precio;
  //           if (stock >= 0) {
  //             prods[j].ProStock = prods[j].ProStock - products[i].quantity;
  //           } else {
  //             errors.push({ code: 'stock', error: 'Sin stock suficiente', product: prods[i] });
  //           }
  //         }
  //       }
  //     }

  //     if (!errors.length) {
  //       const order = await orderRepository.setOrder(userId);
  //       await productRepository.createOrderProducts(Object.assign(order).insertId, products);

  //       for (let i in prods) {
  //         if (prods[i].stock >= 0) {
  //           await mysqlProductRepository.updateProduct(prods[i], prods[i].id);
  //         }
  //       }
  //       return res.status(200).json({ id: Object.assign(order).insertId });
  //     }
  //     console.log(errors);
  //     return res.status(errors.length ? 400 : 200).json({ errors: errors });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  async getOrdersByUser(req: Request, res: Response) {
    const userData = res.locals.userData;
    try {
      const result = await orderRepository.getByUser(parseInt(userData.userId));
      return constructResponse(121, res, result);
    } catch (err) {
      console.log(err);
      return constructResponse(500, res);
    }
  }

  async getOrders(_, res: Response) {
    const userData = res.locals.userData;
    try {
      const result = await orderRepository.getByUser(parseInt(userData.userId));
      return constructResponse(121, res, result);
    } catch (err) {
      console.log(err);
      return constructResponse(500, res);
    }
  }
}

export const orderController = new OrderController();
