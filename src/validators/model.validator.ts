import { NextFunction, Request, Response } from 'express';
import { IModel } from '../interface/model.interface';
import { brandsRepository } from '../repositories/brands.repository';
import { constructResponse } from '../utils/constructResponse';

export const modelValidator = async (req: Request, res: Response, next: NextFunction) => {
  const model: IModel = req.body;
  const errors = [];
  if (model.ModBraId) {
    const brand = await brandsRepository.getById(model.ModBraId);
    if (!brand) {
      errors.push(506);
    }
  }
  if (model.ModName) {
    if (model.ModName.length < 2) errors.push(554);
  } else {
    errors.push(554);
  }
  if (errors.length > 0) {
    return constructResponse(errors, res);
  }
  res.locals.newModel = {
    ModName: model.ModName,
    ModBraId: model.ModBraId,
    createdUser: res.locals.userData.userId,
  };
  return next();
};
