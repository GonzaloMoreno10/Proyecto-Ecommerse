import { brandsRepository } from '../repositories/brands.repository';
import { Request, Response } from 'express';
import { INewBrand } from '../interface/brand.model';
import { constructResponse } from '../utils/constructResponse';
class MarcasController {
  async get(req: Request, res: Response) {
    try {
      console.log(req.hostname);
      console.log(req.originalUrl);
      console.log(req.socket.remoteAddress);
      const filters = req.query;
      const result = await brandsRepository.get(filters);
      return constructResponse(121, res, result);
    } catch (err) {
      console.log(err);
      return constructResponse(500, res);
    }
  }
  async del(req: Request, res: Response) {
    try {
      console.log(req.hostname);
      console.log(req.originalUrl);
      console.log(req.socket.remoteAddress);
      const { BraId } = req.params;
      const userId = res.locals.userData.userId;
      const bra = await brandsRepository.getById(parseInt(BraId));
      if (!bra) {
        return constructResponse(123, res);
      }
      console.log(userId);
      await brandsRepository.del(parseInt(BraId), userId);
      return constructResponse(121, res);
    } catch (err) {
      return constructResponse(500, res, err);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { BraId } = req.params;
      const result = await brandsRepository.getById(parseInt(BraId));
      if (!result) {
        return constructResponse(123, res);
      }
      return constructResponse(121, res, result);
    } catch (err) {
      return constructResponse(500, res);
    }
  }

  async set(req: Request, res: Response) {
    try {
      const { BraName, BraTypId } = req.body;
      if (!BraName || !BraTypId) {
        return constructResponse(128, res);
      }
      const brand: INewBrand = {
        BraName,
        BraTypId,
        createdUser: res.locals.userData.userId,
      };
      const result = await brandsRepository.set(brand);
      return constructResponse(121, res, result);
    } catch (err) {
      console.log(err);
      return constructResponse(500, res);
    }
  }
}

export const marcasController = new MarcasController();
