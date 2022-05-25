import { NextFunction, Request, Response } from 'express';
import { IModel } from '../interface/model.interface';
import { brandsRepository } from '../repositories/brands.repository';
import { constructResponse } from '../utils/constructResponse';
import { validateBindings } from '../utils/validateBindings';

export const modelValidator = async (req: Request, res: Response, next: NextFunction) => {
  const model: IModel = req.body;
  const errors = [];
  const bindings = ['ModBraId', 'ModName'];
  const missings = validateBindings(bindings, model);
  if (missings.length > 0) {
    errors.push(534);
  }
  if (model.ModBraId) {
    const brand = await brandsRepository.getById(model.ModBraId);
    if (!brand) {
      errors.push(506);
    }
  }
  if (model.ModName) {
    if (model.ModName.length < 2) errors.push(554);
  }
  if (errors.length > 0) {
    return constructResponse(errors, res, undefined, undefined, missings);
  }
  res.locals.newModel = {
    ModName: model.ModName,
    ModBraId: model.ModBraId,
    createdUser: res.locals.userData.userId,
  };
  return next();
};
