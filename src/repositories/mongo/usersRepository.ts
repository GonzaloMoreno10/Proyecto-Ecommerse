import mongoose from 'mongoose';
import { MONGO_ATLAS_CLUSTER, MONGO_ATLAS_DB, MONGO_ATLAS_PASSWORD, MONGO_ATLAS_USER } from '../../constantes/venv';
import { NewUserInterface, UserInterface } from '../../interface';
import connect from '../../config/mongoDbConnect';
import userModel from '../../models/user.model';

class UsersRepository {
  private srv: string;
  private users: any;

  constructor() {
    connect(this.srv);
    this.users = userModel;
  }
  async findAll(): Promise<UserInterface[]> {
    let output: UserInterface[] = [];
    try {
      output = await this.users.find();
      return output;
    } catch (err) {
      return err;
    }
  }

  async findByEmail(email: string) {
    let data = await this.users.findOne({ email: email });
    return data;
  }

  async findById(id: string): Promise<UserInterface | undefined> {
    try {
      let usuarios = await this.users.findById(id.toString());
      //console.log(productos);
      return usuarios;
    } catch (err) {
      console.log(err);
    }
  }

  async update(data: UserInterface | Partial<UserInterface>, userId: string): Promise<UserInterface> {
    let res = await this.users.findByIdAndUpdate(userId, data);
    return res;
  }

  async create(data: NewUserInterface): Promise<UserInterface> {
    if (!data.email || !data.password) throw new Error('invalid data');
    const newUser = new this.users(data);
    let res = await newUser.save();
    return res;
  }
}

export const mongoUserRepository = new UsersRepository();
