import { NewUserInterface, UserInterface } from '../../interface';
import userModel from '../../models/user.model';

class UsersRepository {
  private users: any;

  constructor() {
    this.users = userModel;
    // console.log(this.srv);
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
    try {
      let data = await this.users.findOne({ email: email });
      return data;
    } catch (err) {
      throw new Error(err);
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
