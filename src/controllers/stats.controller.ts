import { NextFunction, Request, Response } from 'express';
import { statsRepository } from '../repositories/stats.repository';

class StatsController {
  async isMostSelled(req: Request, res: Response) {
    const productId = parseInt(req.params.productId);
    return res.json(await statsRepository.getTop3MostSelledFromProductType(productId));
  }
}

export const statsController = new StatsController();
