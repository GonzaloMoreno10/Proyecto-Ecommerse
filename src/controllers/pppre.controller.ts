import { Request, Response } from 'express';
import {
  INewProductPresentationProperty,
  IProductPresentationProperty,
} from '../interface/productPresentationProperty.interface';
import { pppreRepository } from '../repositories/pppre.repository';
import { constructResponse } from '../utils/constructResponse';

class PppreController {
  async get(req: Request, res: Response) {
    const { PreId } = req.params;
    let result: IProductPresentationProperty[] | IProductPresentationProperty;
    try {
      if (!PreId) {
        result = await pppreRepository.get();
      } else {
        result = await pppreRepository.getById(parseInt(PreId));
      }
      return constructResponse(121, res, result);
    } catch (err) {
      return constructResponse(500, res, undefined, err);
    }
  }

  async set(_, res: Response) {
    const newPppre: INewProductPresentationProperty[] = res.locals.newPppre;
    const results: IProductPresentationProperty[] = [];
    try {
      for (let i in newPppre) {
        const result = await pppreRepository.create(newPppre[i]);
        results.push(result);
      }
      return constructResponse(121, res, results);
    } catch (err) {
      return constructResponse(500, res, undefined, err);
    }
  }

  async del(req: Request, res: Response) {
    const { PreId } = req.params;
    try {
      const exists = await pppreRepository.getById(parseInt(PreId));
      if (exists) {
        await pppreRepository.del(parseInt(PreId), res.locals.userData.userId);
        return constructResponse(121, res);
      }
      return constructResponse(123, res);
    } catch (err) {
      return constructResponse(500, res, undefined, err);
    }
  }
}

export const pppreController = new PppreController();
