import { NextFunction, Request, Response } from 'express';
import { INewUser } from '../interface';
import { mysqlUserRepository } from '../repositories/users.repository';
import { constructResponse } from '../utils/constructResponse';

export const validAccountData = async (req: Request, res: Response, next: NextFunction) => {
  const post: INewUser = req.body;
  const errors = [];
  if (post.UsrEmail) {
    const exists = await mysqlUserRepository.getUsersByEmail(post.UsrEmail);
    if (exists) errors.push(127);
  }
  if (post.UsrDoc) {
    if (!documentIsValid(post.UsrDoc)) errors.push(125);
  }
  if (post.UsrPass) {
    if (!passwordIsValid(post.UsrPass)) errors.push(132);
  }
  if (!errors.length) {
    const newAccount = {
      email: post.UsrEmail,
      password: post.UsrPass,
      nombre: post.UsrName,
      direccion: post.UsrAddress,
      documento: post.UsrDoc,
      tipoDocumento: post.UsrDocType,
      fecha_nacimiento: post.UsrBirthDate,
      createdUser: 1,
      telefono: post.UsrPhone,
      avatar: 'https://cdn3.iconfinder.com/data/icons/generic-avatars/128/avatar_portrait_man_male_1-128.png',
      rol_id: 1,
      verificado: false,
      codValidacion: null,
    };
    res.locals.accountData = newAccount;
    return next();
  } else {
    console.log(errors);
    return constructResponse(errors, res);
  }
};

export const documentIsValid = (document: number) => {
  return /^[0-9]{8}$/.test(document.toString());
};

const passwordIsValid = (password: string) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/.test(password);
};
