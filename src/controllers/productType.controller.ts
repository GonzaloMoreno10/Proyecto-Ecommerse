import { productTypeRepository } from '../repositories/productType.repository';
import { Request, Response } from 'express';
import { INewProductType } from '../interface/productType.interface';
import { constructResponse } from '../utils/constructResponse';
class ProductTypeController {
  async getById(req: Request, res: Response) {
    try {
      const { TypId } = req.params;
      const result = await productTypeRepository.getById(parseInt(TypId));
      if (result) return constructResponse(121, res, result);

      return constructResponse(123, res);
    } catch (err) {
      console.log(err);
      return constructResponse(500, res);
    }
  }
  async getByCategory(req: Request, res: Response) {
    try {
      const { TypCatId } = req.params;
      const result = await productTypeRepository.getByCategory(parseInt(TypCatId));
      if (result.length > 0) return constructResponse(121, res, result);
      return constructResponse(123, res);
    } catch (err) {
      return constructResponse(500, res);
    }
  }

  async set(req: Request, res: Response) {
    try {
      const { TypCatId, TypName } = req.body;
      const producType: INewProductType = {
        TypCatId,
        TypName,
        createdUser: res.locals.userData.userId,
      };
      const result = await productTypeRepository.set(producType);
      return constructResponse(121, res, result);
    } catch (err) {
      return constructResponse(500, res);
    }
  }

  async del(req: Request, res: Response) {
    try {
      const { TypId } = req.params;
      const userId = res.locals.userData.userId;
      const pt = await productTypeRepository.getById(parseInt(TypId));
      if (!pt) {
        return constructResponse(123, res);
      }
      await productTypeRepository.del(parseInt(TypId), userId);
      return constructResponse(121, res);
    } catch (err) {
      return constructResponse(500, res);
    }
  }

  async get(req: Request, res: Response) {
    try {
      const result = await productTypeRepository.get();
      return constructResponse(121, res, result);
    } catch (err) {
      console.log(err);
      return constructResponse(500, res);
    }
  }
}

export const productTypeController = new ProductTypeController();
