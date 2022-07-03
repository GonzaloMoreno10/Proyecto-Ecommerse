import { Request, Response } from 'express';
import { IBrandModelLine, IBrandModelLineFilter } from '../interface';
import { brandModelLineRepository } from '../repositories/brandModelLine.repository';
import { constructResponse } from '../utils/constructResponse';

class BmlController {
  async get(req: Request, res: Response) {
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
      return constructResponse(500, res, undefined, err);
    }
  }

  async set(_, res: Response) {
    const { bml } = res.locals;
    try {
      const result = await brandModelLineRepository.set(bml);
      return constructResponse(121, res, result);
    } catch (err) {
      return constructResponse(500, res, undefined, err);
    }
  }
}

export const bmlController = new BmlController();
