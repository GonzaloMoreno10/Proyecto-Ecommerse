import { NextFunction, Request, Response } from 'express';
import { GmailService } from '../services/gmail.service';
import { userRepository } from '../repositories/users.repository';
import passport from 'passport';
import { verifyAccount } from '../utils/emailTemplate';
import { constructResponse } from '../utils/constructResponse';
import { INewUser } from '../interface';
class UsersController {
  async getById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    return res.json(await userRepository.getById(id));
  }
  async get(req: Request, res: Response) {
    return await userRepository.get();
  }

  async login(req: Request, res: Response, next: NextFunction) {
    await passport.authenticate('login', async function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ data: 'Unhautorized' });
      }
      req.logIn(user, function (err) {
        if (err) return next(err);
      });
    })(req, res, next);
  }

  async set(_, res: Response) {
    const accountData = res.locals.accountData;
    console.log(accountData);
    try {
      await userRepository.set(accountData);
      const usuario = await userRepository.getByEmail(accountData.UsrEmail);
      if (usuario) {
        console.log('email: ' + usuario.UsrEmail);
        GmailService.sendEmail(
          usuario.UsrEmail,
          'Creacion de cuenta',
          verifyAccount(usuario.UsrId, usuario.UsrValidCod)
        );
        return constructResponse(122, res);
      } else {
        return constructResponse(125, res);
      }
    } catch (err) {
      console.log(err);
      return constructResponse(125, res);
    }
  }
}

export const userController = new UsersController();
