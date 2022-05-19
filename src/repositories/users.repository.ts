import bcrypt from 'bcrypt';
import { UserModel } from '../datasource/sequelize';
import { INewUser, IUser } from '../interface';

class UserRepository {
  async getUsers(): Promise<IUser[]> {
    const result = await UserModel.findAll();
    return <IUser[]>(<unknown>result);
  }

  async getUsersById(id: number): Promise<IUser> {
    const result = await UserModel.findOne({ where: { UsrId: id } });
    return <IUser>(<unknown>result);
  }

  async getUsersByEmail(email: string): Promise<IUser> {
    let result = await UserModel.findOne({ where: { UsrEmail: email } });
    return <IUser>(<unknown>result);
  }

  async updateUser(user: IUser, id: number) {
    const result = await UserModel.update(user, { where: { UsrId: id } });
    console.log(result);
    return result;
  }

  async setUser(user: INewUser) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.UsrPass, salt);
    user.UsrValidCod = hash;
    user.UsrPass = hash;
    return await UserModel.create(user);
  }
}

export const mysqlUserRepository = new UserRepository();
