import { generateToken } from '../services/jwt.service';
import { Request, Response } from 'express';
import { userRepository } from '../repositories/users.repository';
import { constructResponse } from '../utils/constructResponse';
import { INewUser } from '../interface';

class AuthController {
  async login(req: Request, res: Response) {
    const user = req.body;

    const usrToValid: Partial<INewUser> = {
      UsrEmail: user.UsrEmail,
      UsrPass: user.UsrPass,
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
    const userFound = await userRepository.getById(parseInt(userId));
    if (userFound && !userFound.UsrVerfied) {
      if (userFound.UsrValidCod === hash) {
        userFound.UsrVerfied = true;
        await userRepository.upd(Object.assign(userFound).dataValues, userFound.UsrId);
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
