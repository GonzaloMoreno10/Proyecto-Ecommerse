import { generateToken } from '../services/jwt.service';
import { Request, Response } from 'express';
import { mysqlUserRepository } from '../repositories/users.repository';
import { constructResponse } from '../utils/constructResponse';
import { INewUser } from '../interface';

class AuthController {
  async login(req: Request, res: Response) {
    const user = req.body;

    const usrToValid: Partial<INewUser> = {
      UsrEmail: user.email,
      UsrPass: user.password,
    };
    const token = await generateToken(usrToValid);
    if (token.token) {
      res.locals.token = token.token;
    }
    return constructResponse(token.code, res, token.token);
  }

  async accountVerification(req: Request, res: Response) {
    const { userId } = req.params;
    const { hash } = req.query;
    const userFound = await mysqlUserRepository.getUsersById(parseInt(userId));
    //comentario
    if (userFound && !userFound.UsrVerfied) {
      const user = Object.assign(userFound).dataValues;
      if (user.codValidacion === hash) {
        user.verificado = true;
        await mysqlUserRepository.updateUser(user, user.id);
        return constructResponse(124, res);
      } else {
        return constructResponse(125, res);
      }
    } else {
      return constructResponse(126, res);
    }
  }
}

export const authContrroller = new AuthController();
