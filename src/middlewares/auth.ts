import { NextFunction, Request, Response } from 'express';

export const auth = (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    return next();
  } else {
    let message = 'No estas logueado';
    res.render('users/notLogued', { message });
  }
};
