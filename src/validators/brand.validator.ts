import { NextFunction, Request, Response } from 'express';
import { model } from 'mongoose';
import { INewBrand } from '../interface/brand.model';
import { modeloRepository } from '../repositories/model.repository';
import { productTypeRepository } from '../repositories/productType.repository';
import { constructResponse } from '../utils/constructResponse';

export const brandValidator = async (req: Request, res: Response, next: NextFunction) => {
  const brand: INewBrand = req.body;
  const errors = [];
  if (brand.BraModId) {
    const result = await modeloRepository.getModelosById(brand.BraModId);
    if (!result) {
      errors.push(504);
    }
  }
  if (brand.BraTypId) {
    const typ = await productTypeRepository.getProductTypeById(brand.BraTypId);
    if (!typ) {
      errors.push(507);
    }
  }
  if (errors.length) {
    return constructResponse(errors, res);
  }
  return next();
};