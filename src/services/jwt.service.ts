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
    const userData = jwt.verify(token.replace('Bearer ', ''), SECRET_TOKEN_PASSWORD);
    if (userData) {
      return { code: 200, userData };
    }
  } catch (err) {
    return { code: 401, message: err };
  }
};
export const generateToken = async (user: Partial<INewUser>) => {
  const { UsrPass, UsrEmail } = user;
  if (!UsrPass || !UsrEmail) {
    return { code: 130 };
  }
  const userFound: any = await UserModel.findOne({ where: { UsrEmail } });
  if (!userFound) {
    return { code: 131 };
  }
  if (!(await bcrypt.compare(UsrPass, userFound.UsrPass))) {
    return { code: 131 };
  }
  if (!userFound.UsrVerfied) {
    return { code: 514 };
  }

  if (!userFound.UsrPass) {
    return { code: 129 };
  }

  const expiration = moment()
    .add({ minutes: parseInt(TOKEN_TIME) })
    .unix();
  const payload = {
    userId: userFound.dataValues.UsrId,
    userRol: userFound.dataValues.UsrRolId,
    iat: moment().unix(),
    exp: expiration,
  };

  const token = { token: jwt.sign(payload, SECRET_TOKEN_PASSWORD, { algorithm: 'HS256' }), exp: expiration };
  return { code: 121, token };
};
