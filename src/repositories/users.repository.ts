import crypto from 'crypto';
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
    const UsrPassHash = await bcrypt.hash(user.UsrPass, salt);
    const UsrValidCod = crypto.randomBytes(32).toString('hex');
    user.UsrValidCod = await bcrypt.hash(UsrValidCod, salt);
    user.UsrPass = UsrPassHash;
    return await UserModel.create(user);
  }
}

export const userRepository = new UserRepository();
