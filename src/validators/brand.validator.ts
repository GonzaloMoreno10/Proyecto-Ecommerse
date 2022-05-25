import { NextFunction, Request, Response } from 'express';
import { INewBrand } from '../interface/brand.model';
import { productTypeRepository } from '../repositories/productType.repository';
import { constructResponse } from '../utils/constructResponse';
import { validateBindings } from '../utils/validateBindings';

export const brandValidator = async (req: Request, res: Response, next: NextFunction) => {
  const brand: INewBrand = req.body;
  const errors = [];
  const bindings = ['BraName', 'BraTypId'];
  const missings = validateBindings(bindings, brand);
  if (missings.length > 0) {
    errors.push(534);
  }
  if (brand.BraTypId) {
    const typ = await productTypeRepository.getById(brand.BraTypId);
    if (!typ) {
      errors.push(507);
    }
  }
  if (brand.BraName) {
    if (brand.BraName.length <= 1) {
      errors.push(554);
    }
  }
  if (errors.length) {
    return constructResponse(errors, res, undefined, undefined, missings);
  }
  return next();
};
