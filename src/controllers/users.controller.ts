import { mongoUserRepository } from '../repositories/mongo';
import { NextFunction, Request, Response } from 'express';
import { NewUserInterface, UserInterface } from '../interface';
import { GmailService } from '../services/gmail';
import { cadena } from '../utils/MailStructure';
import User from '../models/user.model';
import passport from 'passport';
import { ADMIN_MAIL, PORT } from '../constantes/venv';
class UsersController {
  async editPicture(req: Request, res: Response) {
    let user = Object.assign(req.user);
    //let dir = '';
    let usuario = await mongoUserRepository.findById(user._id);

    let dir = `http://localhost:3000/storage/imgs/${user._id}.jpg`;

    console.log(dir);
    usuario.avatar = dir;
    console.log(usuario);
    await mongoUserRepository.update(usuario, user._id);
    res.redirect('/api/users/profile');
  }

  async editProfile(req: Request, res: Response) {
    let usuario = Object.assign(req.user);
    let { email, nombre, direccion, edad, telefono } = req.body;
    console.log(email);
    let user: Partial<UserInterface> = {
      email,
      nombre,
      direccion,
      edad,
      telefono,
    };

    console.log(user);
    let result = await mongoUserRepository.update(user, usuario._id);
    if (result._id) {
      req.flash('success_msg', 'Datos actualizados');
      return res.redirect('/api/users/profile');
    } else {
      req.flash('error_msg', 'Algo Fallo');
      return res.redirect('/api/users/profile');
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
          let response = await GmailService.sendEmail(ADMIN_MAIL, 'Nuevo Registro', cadena(user));
          console.log(response);
          req.flash('success_msg', 'Usuario creado !');
          res.redirect('/api/users/login');
        } else {
          res.status(400).json('Bad Request');
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      req.flash('error_msg', 'Email ya existente');
      res.redirect('/api/users/singin');
    }
  }
}

export const userController = new UsersController();
