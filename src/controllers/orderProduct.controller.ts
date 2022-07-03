import { Request, Response } from 'express';
import { INewOrderProduct } from '../interface/orderProduct.interface';
import { faorpRepository } from '../repositories/faorp.repository';
import { orderRepository } from '../repositories/orders.repository';
import { productRepository } from '../repositories/product.repository';
import { constructResponse } from '../utils/constructResponse';

class OrderProductController {
  async get(req: Request, res: Response) {
    const filters = res.locals.faorpFilter;
    const { OrpId } = req.params;
    let result = null;
    try {
      if (OrpId) {
        result = await faorpRepository.getById(parseInt(OrpId));
      } else {
        result = await faorpRepository.get(filters);
      }
      if (result?.length || result?.OrpId) {
        return constructResponse(121, res, result);
      }
      return constructResponse(123, res);
    } catch (err) {
      console.log(err);
      return constructResponse(500, res, undefined, err);
    }
  }

  async set(_, res: Response) {
    const { newOrderProduct, newOrder } = res.locals;
    try {
      const result = await orderRepository.set(newOrder);
      if (result.OrdId) {
        for (const i in newOrderProduct.OrpProds) {
          const orp = {
            OrpState: 1,
            OrpOrdId: result.OrdId,
            OrpPrice: newOrderProduct.OrpProds[i].OrpPrice,
            OrpQuantity: newOrderProduct.OrpProds[i].OrpQuantity,
            OrpProId: newOrderProduct.OrpProds[i].OrpProId,
            createdAt: new Date(),
            createdUser: res.locals.userData.userId,
            enabled: true,
            stock: newOrderProduct.OrpProds[i].stock,
          };
          await faorpRepository.create(orp);

          await productRepository.upd({ ProStock: orp.stock - orp.OrpQuantity }, orp.OrpProId);
        }
        return constructResponse(121, res, { OrdId: result.OrdId, createdAt: result.createdAt });
      }
      return constructResponse(684, res);
    } catch (err) {
      return constructResponse(500, res, undefined, err);
    }
  }
}

export const orderProductController = new OrderProductController();
