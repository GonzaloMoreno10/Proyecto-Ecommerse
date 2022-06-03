import { NextFunction, Request, Response } from 'express';
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

  // const existBrand = await brandsRepository.getById(post.)
};
