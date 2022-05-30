import { Request, Response } from 'express';
import { statsRepository } from '../repositories/stats.repository';
import { constructResponse } from '../utils/constructResponse';

class StatsController {
  async isMostSelled(req: Request, res: Response) {
    try {
      const productId = parseInt(req.params.productId);

      const result = await statsRepository.getTop3MostSelledFromProductType(productId);
      return constructResponse(121, res, result);
    } catch (err) {
      console.log(err);
      return constructResponse(500, res, undefined, err);
    }
  }
}

export const statsController = new StatsController();
