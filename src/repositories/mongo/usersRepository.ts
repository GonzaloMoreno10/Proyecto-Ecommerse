import mongoose from 'mongoose';
import { MONGO_ATLAS_CLUSTER, MONGO_ATLAS_DB, MONGO_ATLAS_PASSWORD, MONGO_ATLAS_USER } from '../../constantes/venv';
import { NewUserInterface, UserInterface } from '../../interface';
import connect from '../../config/mongoDbConnect';
const usersSchema = new mongoose.Schema<UserInterface>({
  email: String,
  password: String,
  nombre: String,
  direccion: String,
  edad: Number,
  telefono: String,
  avatar: String,
});

class UsersRepository {
  private srv: string;
  private users: any;

  constructor() {
    connect(this.srv);
    this.users = mongoose.model<UserInterface>('users', usersSchema);
  }
  async findAll(): Promise<UserInterface[]> {
    let output: UserInterface[] = [];
    try {
      output = await this.users.find();
      return output;
    } catch (err) {
      return output;
    }
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

  async create(data: NewUserInterface): Promise<UserInterface> {
    if (!data.email || !data.password) throw new Error('invalid data');
    const newUser = new this.users(data);
    console.log(newUser);
    let res = await newUser.save();
    return res;
  }
}

export const mongoUserRepository = new UsersRepository();
