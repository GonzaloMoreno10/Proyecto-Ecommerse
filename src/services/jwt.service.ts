import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import { SECRET_TOKEN_PASSWORD, TOKEN_TIME } from '../constants/venv';
import { UserModel } from '../datasource/sequelize';
import { INewUser } from '../interface';

export const verfiyToken = (token: string) => {
  if (!token) {
    return { code: 401, message: 'No token value' };
  }
  try {
    const userData = jwt.verify(token, SECRET_TOKEN_PASSWORD);
    if (userData) {
      return { code: 200, userData };
    }
  } catch (err) {
    console.log(err);
    return { code: 401, message: err };
  }
};
export const generateToken = async (user: INewUser) => {
  const { UsrPass, UsrEmail } = user;
  if (!UsrPass || !UsrEmail) {
    return { code: 130 };
  }
  const userFound: any = await UserModel.findOne({ where: { UsrEmail } });
  if (!userFound) {
    return { code: 131 };
  }
  if (!(await bcrypt.compare(UsrPass, userFound.password))) {
    return { code: 131 };
  }

  if (!userFound.verificado) {
    return { code: 129 };
  }

  const expiration = moment()
    .add({ minutes: parseInt(TOKEN_TIME) })
    .unix();
  const payload = {
    userId: userFound.id,
    userRol: userFound.rol_id,
    iat: moment().unix(),
    exp: expiration,
  };

  const token = { token: jwt.sign(payload, SECRET_TOKEN_PASSWORD, { algorithm: 'HS256' }), exp: expiration };
  return { code: 121, token };
};
