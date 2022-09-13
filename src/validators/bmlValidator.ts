import { NextFunction, Request, Response } from 'express';
import { INewBrandModelLine } from '../interface';
import { brandsRepository } from '../repositories/brands.repository';
import { constructResponse } from '../utils/constructResponse';
import { validateBindings } from '../utils/validateBindings';

export const postBmlValidator = (req: Request, res: Response, next: NextFunction) => {
  const bindings = ['BmlBraId', 'BmlLinId', 'BmlModId'];
  const errors = [];
  const post = req.body;
  const missings = validateBindings(bindings, post);

  if (missings.length > 0) {
    return constructResponse(534, res, undefined, undefined, missings);
  }

  const bmlToCreate: INewBrandModelLine = {
    BmlLinId: post.BmlLinId,
    BmlBraId: post.BmlBraId,
    BmlModId: post.BmlModId,
    createdUser: res.locals.userData.userId,
  };

  res.locals.createBml = bmlToCreate;
  next();
  // const existBrand = await brandsRepository.getById(post.)
};
