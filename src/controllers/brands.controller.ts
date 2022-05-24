import { brandsRepository } from '../repositories/brands.repository';
import { Request, Response } from 'express';
import { INewBrand } from '../interface/brand.model';
import { constructResponse } from '../utils/constructResponse';
class MarcasController {
  async getMarcas(req: Request, res: Response) {
    try {
      const result = await brandsRepository.get();
      return constructResponse(121, res, result);
    } catch (err) {
      console.log(err);
      return constructResponse(500, res);
    }
  }

  async getMarcasByProductType(req: Request, res: Response) {
    try {
      const { BraTypId } = req.params;
      const result = await brandsRepository.getBrandsByProductType(parseInt(BraTypId));
      return constructResponse(121, res, result);
    } catch (err) {
      console.log(err);
      return constructResponse(500, res);
    }
  }

  async getMarcasByCategory(req: Request, res: Response) {
    try {
      const { BraCatId } = req.params;
      const result = await brandsRepository.getByCategory(parseInt(BraCatId));
      return constructResponse(121, res, result);
    } catch (err) {
      return constructResponse(500, res);
    }
  }

  async delBrand(req: Request, res: Response) {
    try {
      console.log(res.locals.userData);
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

  async getBrandsById(req: Request, res: Response) {
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

  async setMarca(req: Request, res: Response) {
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
