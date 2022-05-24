import bcrypt from 'bcrypt';
import { UserModel } from '../datasource/sequelize';
import { INewUser, IUser } from '../interface';

class UserRepository {
  async get(): Promise<IUser[]> {
    const result = await UserModel.findAll();
    return <IUser[]>(<unknown>result);
  }

  async getById(id: number): Promise<IUser> {
    const result = await UserModel.findOne({ where: { UsrId: id } });
    return <IUser>(<unknown>result);
  }

  async getByEmail(email: string): Promise<IUser> {
    let result = await UserModel.findOne({ where: { UsrEmail: email } });
    return <IUser>(<unknown>result);
  }

  async upd(user: IUser, id: number) {
    const result = await UserModel.update(user, { where: { UsrId: id } });
    return result;
  }

  async set(user: INewUser) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.UsrPass, salt);
    user.UsrValidCod = hash;
    user.UsrPass = hash;
    console.log(user);
    return await UserModel.create(user);
  }
}

export const userRepository = new UserRepository();
