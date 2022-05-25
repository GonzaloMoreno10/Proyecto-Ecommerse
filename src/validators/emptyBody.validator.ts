import { NextFunction, Request, Response } from 'express';
import { constructResponse } from '../utils/constructResponse';

export const emptyBodyValidator = (req: Request, res: Response, next: NextFunction) => {
  const post = Object.entries(req.body);
  if (post.length === 0 || !post.length) {
    constructResponse(128, res);
  } else {
    return next();
  }
};
