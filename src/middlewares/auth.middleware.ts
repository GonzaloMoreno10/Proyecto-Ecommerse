import { NextFunction, Request, Response } from 'express';
import { APIKEY } from '../constants/venv';
import { verfiyToken } from '../services/jwt.service';

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
      return next();
    } else {
      return res.status(401).json({ code: 401, message: 'Invalid apikey' });
    }
  }
  if (authorization) {
    const result = verfiyToken(authorization.replace('Bearer ', ''));
    if (result.code !== 200) {
      return res.status(401).json({ code: result.code, message: result.message });
    } else {
      res.locals.userData = result.userData;
      return next();
    }
  }
  return res.status(401).json({ code: 401, message: 'No headers values' });
};
