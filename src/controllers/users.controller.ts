import { mongoUserRepository } from '../repositories/mongo';
import { NextFunction, Request, Response } from 'express';
import { NewUserInterface, UserInterface } from '../interface';
import { GmailService } from '../services/gmail';
import { cadena } from '../utils/MailStructure';
import User from '../models/user.model';
import passport from 'passport';
import { ADMIN_MAIL } from '../constantes/venv';
class UsersController {
  async editPicture(req: Request, res: Response) {
    let { userId } = req.params;
    //let dir = '';
    let usuario = await mongoUserRepository.findById(userId);

    let dir = `http://localhost:3000/storage/imgs/${userId}.jpg`;
    console.log(dir);
    usuario.avatar = dir;
    try {
      const updateUser = await mongoUserRepository.update(usuario, userId);
      return res.status(200).json(updateUser);
    } catch (err) {
      return res.json(err);
    }
  }

  async findById(req: Request, res: Response) {
    let { userId } = req.params;
    console.log(userId);
    const user = await mongoUserRepository.findById(userId);
    console.log(user);
    return res.json(user);
  }

  async editProfile(req: Request, res: Response) {
    let { id } = req.params;

    let { email, nombre, direccion, edad, telefono } = req.body;
    let user: Partial<UserInterface> = {
      email,
      nombre,
      direccion,
      edad,
      telefono,
    };

    //console.log(user);
    try {
      let result = await mongoUserRepository.update(user, id);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json(err);
    }
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

  info(req: Request, res: Response) {
    res.send({
      session: req.session,
      sessionid: req.sessionID,
      cookies: req.cookies,
    });
  }

  async createUser(req: Request, res: Response) {
    let { email, password, nombre, direccion, edad, telefono } = req.body;
    let data = await User.findOne({ email: email });
    if (!data) {
      let user: NewUserInterface = {
        email,
        password,
        nombre,
        direccion,
        edad,
        telefono,
        avatar: 'https://cdn3.iconfinder.com/data/icons/generic-avatars/128/avatar_portrait_man_male_1-128.png',
      };
      try {
        let result = await mongoUserRepository.create(user);
        if (result._id) {
          await GmailService.sendEmail(ADMIN_MAIL, 'Nuevo Registro', cadena(user));
          return res.status(201).json(result);
        } else {
          res.status(400).json('Bad Request');
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      return res.status(400).json('Email existente');
    }
  }
}

export const userController = new UsersController();
