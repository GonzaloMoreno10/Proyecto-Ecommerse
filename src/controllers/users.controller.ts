import { NextFunction, Request, Response } from 'express';
import { GmailService } from '../services/gmail.service';
import { userRepository } from '../repositories/users.repository';
import passport from 'passport';
import { verifyAccount } from '../utils/emailTemplate';
import { constructResponse } from '../utils/constructResponse';
import { INewUser } from '../interface';
class UsersController {
  async getUsersById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    return res.json(await userRepository.getUsersById(id));
  }
  async getUsers(req: Request, res: Response) {
    return await userRepository.getUsers();
  }
  // async editPicture(req: Request, res: Response) {
  //   let userId = parseInt(req.params.userId);

  //   //let dir = '';
  //   let usuario = await mysqlUserRepository.getUsersById(userId);

  //   let dir = `http://localhost:3000/storage/imgs/${userId}.jpg`;

  //   usuario.avatar = dir;
  //   try {
  //     await mysqlUserRepository.updateUser(usuario, userId);
  //     const updateUser = await mysqlUserRepository.getUsersById(userId);
  //     return res.status(200).json(updateUser);
  //   } catch (err) {
  //     return res.json(err);
  //   }
  // }

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

  async createUser(_, res: Response) {
    const accountData = res.locals.accountData;
    console.log(accountData);
    try {
      await userRepository.setUser(accountData);
      const usuario = await userRepository.getUsersByEmail(accountData.UsrEmail);
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
