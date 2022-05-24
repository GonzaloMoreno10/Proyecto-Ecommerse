import { NextFunction, Request, Response } from 'express';
import { INewProductProperty, IProductProperty } from '../interface/productProperty.interface';
import { categoryRepository } from '../repositories/category.repository';
import { productRepository } from '../repositories/product.repository';
import { productTypeRepository } from '../repositories/productType.repository';
import { constructResponse } from '../utils/constructResponse';

export const productPropertyValidator = async (req: Request, res: Response, next: NextFunction) => {
  const property: IProductProperty = req.body;
  const errors = [];

  if (!property.ProCatId || !property.ProTypId || !property.ProName) {
    errors.push(125);
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
    return constructResponse(errors, res);
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
