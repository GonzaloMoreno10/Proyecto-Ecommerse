import { NextFunction, Response, Request } from 'express';
import { INewCategory } from '../interface';
import { constructResponse } from '../utils/constructResponse';

export const validCategory = (req: Request, res: Response, next: NextFunction) => {
  const category: Partial<INewCategory> = req.body;
  if (!category.CatName) {
    return constructResponse(125, res);
  }

  return next();
};
