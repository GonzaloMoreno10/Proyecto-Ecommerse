import { NextFunction, Request, Response } from 'express';
import { INewLine } from '../interface/line.interface';
import { modelRepository } from '../repositories/model.repository';
import { constructResponse } from '../utils/constructResponse';
import { validateBindings } from '../utils/validateBindings';

export const lineValidator = async (req: Request, res: Response, next: NextFunction) => {
  const line: INewLine = req.body;
  const errors = [];
  const bindings = ['LinModId', 'LinName'];
  const missings = validateBindings(bindings, line);
  if (missings.length > 0) {
    errors.push(534);
  }
  if (line.LinModId) {
    const modelo = await modelRepository.getById(line.LinModId);
    if (!modelo) {
      errors.push(504);
    }
  }
  if (errors.length) {
    return constructResponse(errors, res, undefined, undefined, missings);
  }
  return next();
};
