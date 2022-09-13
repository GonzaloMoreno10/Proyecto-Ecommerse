import { NextFunction, Request, Response } from 'express';
import { IBrandModelLine, IBrandModelLineFilter } from '../interface';
import { brandModelLineRepository } from '../repositories/brandModelLine.repository';
import { constructResponse } from '../utils/constructResponse';

class BmlController {
  async get(req: Request, res: Response, next: NextFunction) {
    const filter: Partial<IBrandModelLineFilter> = req.query;
    let result: IBrandModelLine[] | IBrandModelLine;
    const { BmlId } = req.params;
    try {
      if (BmlId) {
        result = await brandModelLineRepository.getById(parseInt(BmlId));
      } else {
        result = await brandModelLineRepository.get(filter);
      }
      return constructResponse(121, res, result);
    } catch (err) {
      next(err);
    }
  }

  async set(_, res: Response, next: NextFunction) {
    const { createBml } = res.locals;
    try {
      const result = await brandModelLineRepository.set(createBml);
      return constructResponse(121, res, result);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

export const bmlController = new BmlController();
