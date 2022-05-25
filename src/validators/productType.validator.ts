import { NextFunction, Request, Response } from 'express';
import { IProductType } from '../interface/productType.interface';
import { categoryRepository } from '../repositories/category.repository';
import { constructResponse } from '../utils/constructResponse';
import { validateBindings } from '../utils/validateBindings';

export const productTypeValidator = async (req: Request, res: Response, next: NextFunction) => {
  const productType: IProductType = req.body;
  const errors = [];
  const bindings = ['TypName', 'TypCatId'];
  const missing = validateBindings(bindings, productType);

  if (missing.length > 0) {
    errors.push(534);
  }
  if (productType.TypCatId) {
    const pt = await categoryRepository.getById(productType.TypCatId);
    if (!pt) {
      errors.push(524);
    }
  }
  if (errors.length > 0) {
    return constructResponse(errors, res, undefined, undefined, missing);
  }
  return next();
};
