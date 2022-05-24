import { NextFunction, Request, Response } from 'express';
import { IProductType } from '../interface/productType.interface';
import { categoryRepository } from '../repositories/category.repository';
import { constructResponse } from '../utils/constructResponse';

export const productTypeValidator = async (req: Request, res: Response, next: NextFunction) => {
  const productType: IProductType = req.body;
  const errors = [];
  if (productType.TypCatId) {
    const pt = await categoryRepository.getById(productType.TypCatId);
    if (!pt) {
      errors.push(524);
    }
  } else {
    errors.push(508);
  }
  if (errors.length > 0) {
    return constructResponse(errors, res, undefined, undefined, 'TypCatId');
  }
  return next();
};
