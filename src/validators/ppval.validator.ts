import { NextFunction, Request, Response } from 'express';
import { ppsuiRepository } from '../repositories/ppsui.repository';
import { constructResponse } from '../utils/constructResponse';

export const ppvalValidator = async (req: Request, res: Response, next: NextFunction) => {
  const post = req.body;
  const errors = [];
  const successArray = [];

  if (post.ValSuiId) {
    const sui = await ppsuiRepository.getById(post.ValSuiId);
    if (!sui) {
      errors.push(594);
    }
  }
  for (const i in post.ValNames) {
    if (post.ValNames[i] !== '') {
      successArray.push({
        ValName: post.ValNames[i].ValName,
        ValSuiId: post.ValSuiId,
        ValDesc: post.ValNames[i].ValDesc,
        createdUser: res.locals.userData.userId,
      });
    } else {
      errors.push(554);
    }
  }
  if (errors.length > 0) {
    return constructResponse(errors, res);
  }

  res.locals.newPpval = successArray;

  return next();
};
