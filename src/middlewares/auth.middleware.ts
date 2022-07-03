import { NextFunction, Request, Response } from 'express';
import { APIKEY } from '../constants/venv';
import { verfiyToken } from '../services/jwt.service';
import { constructResponse } from '../utils/constructResponse';

export const tokenIsValid = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return constructResponse(501, res);
  }
  try {
    const result = verfiyToken(authorization);
    if (result.code !== 200) {
      console.log('Entre aca');
      return constructResponse(503, res);
    }
    res.locals.userData = result.userData;
    return next();
  } catch (err) {
    return constructResponse(500, res, undefined, err);
  }
};

export const tokenOrApiKeyIsValid = (req: Request, res: Response, next: NextFunction) => {
  const { apikey, authorization } = req.headers;
  if (apikey) {
    if (apikey === APIKEY) {
      res.locals.userData = { userId: 1 };
      return next();
    } else {
      return constructResponse(502, res);
    }
  }
  if (authorization) {
    const result = verfiyToken(authorization);
    if (result.code !== 200) {
      return constructResponse(503, res);
    } else {
      res.locals.userData = result.userData;
      return next();
    }
  }
  return constructResponse(501, res);
};
