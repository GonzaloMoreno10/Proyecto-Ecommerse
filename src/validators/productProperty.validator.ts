import { NextFunction, Request, Response } from 'express';
import { INewProductProperty, IProductProperty } from '../interface/productProperty.interface';
import { categoryRepository } from '../repositories/category.repository';
import { productTypeRepository } from '../repositories/productType.repository';
import { constructResponse } from '../utils/constructResponse';
import { validateBindings } from '../utils/validateBindings';

export const productPropertyValidator = async (req: Request, res: Response, next: NextFunction) => {
  const property: IProductProperty = req.body;
  const errors = [];
  const bindings = ['ProCatId', 'ProTypId', 'ProName'];
  const obligatorios = validateBindings(bindings, property);
  if (obligatorios.length > 0) {
    errors.push(534);
  }

  if (property.ProCatId) {
    const category = await categoryRepository.getById(property.ProCatId);
    if (!category) {
      errors.push(524);
    }
  }
  if (property.ProTypId) {
    const prodType = await productTypeRepository.getById(property.ProTypId);
    if (!prodType) {
      errors.push(507);
    }
  }

  if (errors.length > 0) {
    return constructResponse(errors, res, undefined, undefined, obligatorios);
  }

  const prop: INewProductProperty = {
    ProCatId: property.ProCatId,
    ProTypId: property.ProTypId,
    ProName: property.ProName,
    createdUser: res.locals.userData.userId,
  };

  res.locals.newProductProperty = prop;

  return next();
};
