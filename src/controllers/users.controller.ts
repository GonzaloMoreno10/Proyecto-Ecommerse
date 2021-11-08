import { mongoProductRepository, mongoUserRepository } from '../repositories/mongo';
import { Request, Response } from 'express';
import { NewUserInterface } from '../interface';
class UsersController {
  async getUsers(req: Request, res: Response) {
    let data = await mongoUserRepository.findAll();
    res.json(data);
  }

  async createUser(req: Request, res: Response) {
    let { email, password, nombre, direccion, edad, telefono, avatar } = req.body;
    let user: NewUserInterface = {
      email,
      password,
      nombre,
      direccion,
      edad,
      telefono,
      avatar,
    };
    try {
      let result = await mongoUserRepository.create(user);
      console.log(result);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

export const userController = new UsersController();
