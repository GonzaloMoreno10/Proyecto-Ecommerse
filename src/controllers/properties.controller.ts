import { productPropertyRepository } from '../repositories/productProperties.repository';
import { Request, Response } from 'express';
import { constructResponse } from '../utils/constructResponse';
import { IProductProperty } from '../interface/productProperty.interface';
class ProductPropertyController {
  async get(req: Request, res: Response) {
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
      return constructResponse(500, res, err);
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
}

export const productPropertyController = new ProductPropertyController();
