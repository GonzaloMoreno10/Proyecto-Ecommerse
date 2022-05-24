import { NextFunction, Request, Response } from 'express';
import { INewProduct } from '../interface';
import { brandModelLineRepository } from '../repositories/brandModelLine.repository';
import { brandsRepository } from '../repositories/brands.repository';
import { categoryRepository } from '../repositories/category.repository';
import { productTypeRepository } from '../repositories/productType.repository';
import { constructResponse } from '../utils/constructResponse';

export const productValidator = async (req: Request, res: Response, next: NextFunction) => {
  const product: INewProduct = req.body;
  const errors = [];
  if (
    !product.ProName ||
    !product.ProPrice ||
    !product.ProStock ||
    !product.ProTypId ||
    !product.ProCatId ||
    !product.ProBmlId ||
    (product.ProIsOffer && !product.ProDiscount)
  ) {
    errors.push(534);
  }
  if (product.ProTypId) {
    const res = await productTypeRepository.getById(product.ProTypId);
    if (!res) {
      errors.push(507);
    }
  }
  if (product.ProCatId) {
    const cat = await categoryRepository.getById(product.ProCatId);
    if (!cat) {
      errors.push(524);
    }
  }
  if (product.ProBmlId) {
    const bml = await brandModelLineRepository.getById(product.ProBmlId);
    if (!bml) {
      errors.push(544);
    }
  }
  if (errors.length > 0) {
    return constructResponse(errors, res);
  }

  const prod: INewProduct = {
    ProBmlId: product.ProBmlId,
    ProCatId: product.ProCatId,
    ProCod: product.ProCod,
    ProDesc: product.ProDesc,
    ProDiscount: product.ProDiscount,
    ProImgs: product.ProImgs,
    ProIsOffer: product.ProIsOffer,
    ProName: product.ProName,
    ProPrice: product.ProPrice,
    ProStock: product.ProStock,
    ProTypId: product.ProTypId,
    ProUsrId: res.locals.userData.userId,
    createdAt: new Date(),
    createdUser: res.locals.userData.userId,
  };
  res.locals.newProduct = prod;
  return next();
};
