import { brandsRepository } from '../repositories/brands.repository';
import { Request, Response } from 'express';
import { IBrand, INewBrand } from '../interface/brand.model';
import { constructResponse } from '../utils/constructResponse';
class MarcasController {
  async get(req: Request, res: Response) {
    const { BraId } = req.params;
    const filters = req.query;
    let brands: IBrand[];
    try {
      if (!BraId) {
        brands = await brandsRepository.get(filters);
      } else {
        brands = await brandsRepository.getById(parseInt(BraId));
      }
      if (brands.length > 0) {
        return constructResponse(121, res, brands);
      }
      return constructResponse(123, res);
    } catch (err) {
      console.log(err);
      return constructResponse(500, res);
    }
  }
  async del(req: Request, res: Response) {
    try {
      const { BraId } = req.params;
      const userId = res.locals.userData.userId;
      const bra = await brandsRepository.getById(parseInt(BraId));
      if (bra.length <= 0) {
        return constructResponse(123, res);
      }
      await brandsRepository.del(parseInt(BraId), userId);
      return constructResponse(121, res);
    } catch (err) {
      return constructResponse(500, res, err);
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
