import { NextFunction, Request, Response } from 'express';
import { INewOrder } from '../interface';
import { constructResponse } from '../utils/constructResponse';
import { validateFilters } from '../utils/validateFilters';

export const orderValidator = async (req: Request, res: Response, next: NextFunction) => {
  const newOrder: INewOrder = {
    OrdState: 1,
    OrdUsrId: res.locals.userData.userId,
    createdAt: new Date(),
    createdUser: res.locals.userData.userId,
    enabled: true,
  };
  res.locals.newOrder = newOrder;
  return next();
};

export const filterOrderValidator = async (req: Request, res: Response, next: NextFunction) => {
  const filters = Object.entries(req.query);
  const avaibleFilters = ['OrdUsrId', 'OrdState', 'fields'];
  const { invalidFilters, mapFilter } = validateFilters(filters, avaibleFilters);
  if (invalidFilters.length > 0) {
    return constructResponse(614, res, undefined, undefined, invalidFilters);
  }
  res.locals.orderFilter = mapFilter;
  return next();
};

export const fieldOrderValidator = async (req: Request, res: Response, next: NextFunction) => {
  const { fields } = req.query;
  const avaibleFields = ['FAORP', 'PRPRO'];
  const invalidFields = [];
  if (!fields) {
    return next();
  }

  const arrayFields = String(fields).split(',');
  arrayFields.map(field => {
    if (!avaibleFields.includes(field)) {
      invalidFields.push(field);
    }
  });

  if (!arrayFields.includes('FAORP') && arrayFields.includes('PRPRO')) {
    return constructResponse(614, res, undefined, undefined, ['Si incluye PRPRO debe incluir FAORP']);
  }
  if (invalidFields.length > 0) {
    return constructResponse(634, res, undefined, undefined, invalidFields);
  }
  res.locals.orderFields = arrayFields;
  return next();
};
