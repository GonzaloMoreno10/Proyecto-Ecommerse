import { NextFunction, Request, Response } from 'express';
import { nextTick } from 'process';
import { IProduct } from '../interface';
import {
  INewOrderProduct,
  IOrderProduct,
  IOrderProductFilter,
  IPostOrderProduct,
} from '../interface/orderProduct.interface';
import { orderRepository } from '../repositories/orders.repository';
import { productRepository } from '../repositories/product.repository';
import { constructResponse } from '../utils/constructResponse';
import { validateBindings } from '../utils/validateBindings';
import { validateFilters } from '../utils/validateFilters';

export const orpFilterValidator = async (req: Request, res: Response, next: NextFunction) => {
  const filters = Object.entries(req.query);
  const avalibleFilters = ['OrpState', 'OrpOrdId', 'OrpProId', 'MaxPrice', 'MinPrice', 'MinQuantity', 'MaxQuantity'];

  const { invalidFilters, mapFilter } = validateFilters(filters, avalibleFilters);

  if (invalidFilters.length > 0) {
    return constructResponse(614, res, undefined, undefined, invalidFilters);
  }

  res.locals.faorpFilter = mapFilter;
  return next();
};

export const faorpValidator = async (req: Request, res: Response, next: NextFunction) => {
  const bindings = ['OrpProds'];
  const products = [];
  const post: IPostOrderProduct = req.body;
  const missings = validateBindings(bindings, post);
  const errors = [];
  if (missings.length > 0) {
    errors.push(534);
  }

  if (post.OrpOrdId) {
    const existsOrd = await orderRepository.getById(post.OrpOrdId);
    if (!existsOrd) {
      errors.push(654);
    }
  }
  if (post.OrpProds) {
    for (const i in post.OrpProds) {
      if (!post.OrpProds[i].OrpProId || !post.OrpProds[i].OrpQuantity) {
        errors.push(694);
        break;
      }
      const prod: IProduct = await productRepository.getById(post.OrpProds[i].OrpProId);
      if (!prod) {
        errors.push(564);
        break;
      }
      if (post.OrpProds[i].OrpQuantity && post.OrpProds[i].OrpQuantity <= 0) {
        errors.push(664);
        break;
      }
      if (prod.ProStock - post.OrpProds[i].OrpQuantity < 0) {
        errors.push(674);
        break;
      }
      products.push({
        OrpQuantity: post.OrpProds[i].OrpQuantity,
        OrpProId: prod.ProId,
        OrpPrice: prod.ProPrice,
        stock: prod.ProStock,
      });
    }
  }

  if (errors.length > 0) {
    return constructResponse(errors, res, undefined, undefined, validateBindings(bindings, post));
  }
  const newOrderProduct = {
    OrpOrdId: post.OrpOrdId,
    OrpState: 1,
    OrpProds: products,
    createdUser: res.locals.userData.userId,
    enabled: true,
    createdAt: new Date(),
  };
  res.locals.newOrderProduct = newOrderProduct;
  return next();
};
