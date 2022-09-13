import { Request, Response } from 'express';
import { IProduct } from '../interface';
import { INewOrderProduct, IOrderProduct } from '../interface/orderProduct.interface';
import { faorpRepository } from '../repositories/faorp.repository';
import { orderRepository } from '../repositories/orders.repository';
import { productRepository } from '../repositories/product.repository';
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

  async getByUser(req: Request, res: Response) {
    const userData = res.locals.userData;
    try {
      const result = await orderRepository.get({ OrdUsrId: parseInt(userData.userId) });
      return constructResponse(121, res, result);
    } catch (err) {
      console.log(err);
      return constructResponse(500, res);
    }
  }
  async get(req: Request, res: Response) {
    const { orderFields, orderFilter } = res.locals;
    const { OrdId } = req.params;
    if (OrdId) {
      orderFilter.OrdId = OrdId;
    }
    try {
      const result: any = await orderRepository.get(orderFilter, orderFields);
      if (result.length > 0) {
        for (const ord of result) {
          ord.dataValues.totalPrice = ord.FAORPs.reduce((total: number, next) => {
            return total + next.PRPRO.ProPrice;
          }, 0);
        }
        return constructResponse(121, res, result);
      }
      return constructResponse(123, res);
    } catch (err) {
      console.log(err);
      return constructResponse(500, res);
    }
  }
  async create(_, res: Response) {
    const { newOrder } = res.locals;
    try {
      const result = await orderRepository.set(newOrder.order);
      const OrderId = result.OrdId;
      const promises = [];
      if (result.OrdId) {
        for (const orp of newOrder.products) {
          const product = await productRepository.getById(orp.productId);
          const faorp: INewOrderProduct = {
            OrpState: 1,
            OrpOrdId: OrderId,
            OrpProId: product.ProId,
            OrpQuantity: orp.quantity,
            OrpPrice: parseInt(product.ProPrice),
            createdUser: newOrder.order.createdUser,
            enabled: true,
          };
          promises.push(faorpRepository.create(faorp));
        }
        const finalResult = await Promise.all(promises);
        return constructResponse(121, res, {
          OrdId: result.OrdId,
          OrpIds: finalResult.map(x => x.OrpId),
        });
      }
    } catch (err) {
      console.log(err);
      return constructResponse(500, res, undefined, err);
    }
  }
}

export const orderController = new OrderController();
