import { NextFunction, Request, Response } from 'express';
import { INewUser } from '../interface';
import { userRepository } from '../repositories/users.repository';
import { constructResponse } from '../utils/constructResponse';
import { validateBindings } from '../utils/validateBindings';
import emailValidator from 'email-validator';

export const validAccountData = async (req: Request, res: Response, next: NextFunction) => {
  const post: INewUser = req.body;
  const errors = [];
  const bindings = ['UsrEmail', 'UsrPass', 'UsrName', 'UsrAddress', 'UsrBirthDate', 'UsrPhone', 'UsrDoc', 'UsrDocType'];
  const missing = validateBindings(bindings, post);
  if (!emailValidator.validate(post.UsrEmail)) {
    errors.push(574);
  }
  if (missing.length > 0) {
    errors.push(534);
  }
  if (post.UsrEmail) {
    const exists = await userRepository.getByEmail(post.UsrEmail);
    if (exists) errors.push(127);
  }
  if (post.UsrDoc) {
    if (!documentIsValid(post.UsrDoc)) errors.push(704);
  }
  if (post.UsrPass) {
    if (!passwordIsValid(post.UsrPass)) errors.push(132);
  }
  if (!errors.length || errors.length <= 0) {
    const newAccount = {
      UsrEmail: post.UsrEmail,
      UsrPass: post.UsrPass,
      UsrName: post.UsrName,
      UsrAddress: post.UsrAddress,
      UsrDoc: post.UsrDoc,
      UsrDocType: post.UsrDocType,
      UsrBirthDate: post.UsrBirthDate,
      createdUser: 1,
      UsrPhone: post.UsrPhone,
      UsrAvatar: 'https://cdn3.iconfinder.com/data/icons/generic-avatars/128/avatar_portrait_man_male_1-128.png',
      UsrRolId: 1,
      UsrVerfied: false,
      UsrValidCod: null,
    };
    res.locals.accountData = newAccount;
    return next();
  } else {
    return constructResponse(errors, res, undefined, undefined, missing);
  }
};

export const documentIsValid = (document: number) => {
  return /^[0-9]{8}$/.test(document.toString());
};

const passwordIsValid = (password: string) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/.test(password);
};
