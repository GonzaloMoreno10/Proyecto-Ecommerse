import { NextFunction, Request, Response } from 'express';
import { productPropertyRepository } from '../repositories/productProperties.repository';
import { constructResponse } from '../utils/constructResponse';

export const ppsuiValidator = async (req: Request, res: Response, next: NextFunction) => {
  const post = req.body;
  const errors = [];
  const successArray = [];

  if (post.SuiProId) {
    const pro = await productPropertyRepository.getById(post.SuiProId);
    if (!pro) {
      errors.push(584);
    }
  }

  for (const i in post.SuiNames) {
    if (post.SuiNames[i] !== '') {
      successArray.push({
        SuiName: post.SuiNames[i],
        SuiProId: post.SuiProId,
        createdUser: res.locals.userData.userId,
      });
    } else {
      errors.push(554);
    }
  }
  if (errors.length > 0) {
    return constructResponse(errors, res);
  }

  res.locals.newPpsui = successArray;

  return next();
};
