import { NextFunction, Request, Response } from 'express';
import { IProductPresentationProperty } from '../interface/productPresentationProperty.interface';
import { pppreRepository } from '../repositories/pppre.repository';
import { ppvalRepository } from '../repositories/ppval.repository';
import { productRepository } from '../repositories/product.repository';
import { constructResponse } from '../utils/constructResponse';
import { validateBindings } from '../utils/validateBindings';

export const pppreValidator = async (req: Request, res: Response, next: NextFunction) => {
  const post: IProductPresentationProperty[] = req.body;
  const errors = [];
  const successArray = [];
  const bindings = ['PreProId', 'PreValId'];
  let missings = [];
  for (const i in post) {
    missings = validateBindings(bindings, post[i]);
    if (missings.length === 0) {
      const pro = await productRepository.getById(post[i].PreProId);
      if (!pro) {
        console.log('Entre por aca');
        errors.push(564);
      } else {
        const val = await ppvalRepository.getById(post[i].PreValId);
        if (!val) {
          errors.push(604);
        } else {
          const exists = await pppreRepository.get({
            PreValId: post[i].PreValId,
            PreProId: post[i].PreProId,
          });
          if (exists.length > 0) {
            errors.push(604);
          } else {
            successArray.push({
              PreProId: post[i].PreProId,
              PreValId: post[i].PreValId,
              createdUser: res.locals.userData.userId,
            });
          }
        }
      }
    } else {
      errors.push(534);
    }
  }
  if (errors.length) {
    return constructResponse(errors, res, undefined, undefined, missings);
  }
  res.locals.newPppre = successArray;
  return next();
};
