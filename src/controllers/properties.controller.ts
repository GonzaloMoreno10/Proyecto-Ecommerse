import { productPropertyRepository } from '../repositories/productProperties.repository';
import { NextFunction, Request, Response } from 'express';
import { constructResponse } from '../utils/constructResponse';
import { IProductProperty } from '../interface/productProperty.interface';
import { pppreRepository } from '../repositories/pppre.repository';
class ProductPropertyController {
  async get(req: Request, res: Response, next: NextFunction) {
    const { TypId } = req.params;
    let result: IProductProperty[] | IProductProperty = [];
    try {
      if (TypId) {
        result = await productPropertyRepository.getById(parseInt(TypId));
      } else {
        result = await productPropertyRepository.get();
      }
      return constructResponse(121, res, result);
    } catch (err) {
      next(err);
    }
  }
  async set(req: Request, res: Response) {
    const pp = res.locals.newProductProperty;
    try {
      const result = await productPropertyRepository.set(pp);
      return constructResponse(121, res, result);
    } catch (err) {
      console.log(err);
      return constructResponse(500, res, undefined, err);
    }
  }
  async getByProductType(req: Request, res: Response) {
    try {
      const { productTypeId } = req.params;
      const properties = await productPropertyRepository.getByProductType(parseInt(productTypeId));
      res.status(200).json(properties);
    } catch (err) {
      console.log(err);
    }
  }
  async getPrProPre(req: Request, res: Response) {
    const result = await pppreRepository.getPrProPreByProdId(1);
    return constructResponse(121, res, result);
  }
}

export const productPropertyController = new ProductPropertyController();
