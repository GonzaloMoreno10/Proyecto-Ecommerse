import { NextFunction, Request, Response } from 'express';
import { INewLine } from '../interface/line.interface';
import { modelRepository } from '../repositories/model.repository';
import { constructResponse } from '../utils/constructResponse';

export const lineValidator = async (req: Request, res: Response, next: NextFunction) => {
  const line: INewLine = req.body;
  const errors = [];
  if (line.LinModId) {
    const modelo = await modelRepository.getById(line.LinModId);
    if (!modelo) {
      errors.push(504);
    }
  }
  if (!line.LinName) {
    errors.push(508);
  }
  if (errors.length) {
    return constructResponse(errors, res, undefined, undefined, 'LinName');
  }
  return next();
};
