import { NextFunction, Request, Response } from 'express';
import { APIKEY } from '../constants/venv';
import { verfiyToken } from '../services/jwt.service';
import { constructResponse } from '../utils/constructResponse';

export const auth = (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    return next();
  } else {
    let message = 'No estas logueado';
    res.render('users/notLogued', { message });
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
      return constructResponse(503, res, undefined, result.message);
    } else {
      res.locals.userData = result.userData;
      return next();
    }
  }
  return constructResponse(501, res);
};
