import { mongoUserRepository } from '../repositories/mongo';
import { NextFunction, Request, Response } from 'express';
import { NewUserInterface, UserInterface } from '../interface';
import { GmailService } from '../services/gmail';
import { cadena } from '../utils/MailStructure';
import User, { IUserMySql } from '../models/user.model';
import { mysqlUserRepository } from '../repositories/mysql/usersRepository';
import passport from 'passport';
import { ADMIN_MAIL } from '../constantes/venv';
class UsersController {
  async getUsersById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    return res.json(await mysqlUserRepository.getUsersById(id));
  }
  async getUsers(req: Request, res: Response) {
    const data = await mysqlUserRepository.getUsers();
    return res.json(data);
  }
  async editPicture(req: Request, res: Response) {
    let userId = parseInt(req.params.userId);

    //let dir = '';
    let usuario = await mysqlUserRepository.getUsersById(userId);

    let dir = `http://localhost:3000/storage/imgs/${userId}.jpg`;

    usuario.avatar = dir;
    try {
      await mysqlUserRepository.updateUser(usuario, userId);
      const updateUser = await mysqlUserRepository.getUsersById(userId);
      return res.status(200).json(updateUser);
    } catch (err) {
      return res.json(err);
    }
  }

  async findById(req: Request, res: Response) {
    let { id } = req.params;

    const user = await mongoUserRepository.findById(id);

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

    try {
      await mongoUserRepository.update(user, id);
      let result = await mongoUserRepository.findById(id);
      return res.status(201).json(result);
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

  async createUser(req: Request, res: Response) {
    let { email, password, nombre, direccion, fecha_nacimiento, telefono, admin } = req.body;
    if (!email || !password) {
      return res.status(400).json('Invalid Body');
    }
    let data = await mysqlUserRepository.getUsersByEmail(email);
    console.log(data);
    if (!data) {
      let user: IUserMySql = {
        email,
        password,
        nombre,
        direccion,
        fecha_nacimiento,
        telefono,
        avatar: 'https://cdn3.iconfinder.com/data/icons/generic-avatars/128/avatar_portrait_man_male_1-128.png',
        rol_id: 1,
      };

      try {
        let result = await mysqlUserRepository.setUser(user);

        if (result) {
          //Comentado por que alcance la cuota limite de emails
          // await GmailService.sendEmail(ADMIN_MAIL, 'Nuevo Registro', cadena(user));
          return res.status(201).json('Usuario creado');
        } else {
          res.status(400).json('Bad Request');
        }
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    } else {
      return res.status(400).json('Email existente');
    }
  }
}

export const userController = new UsersController();
