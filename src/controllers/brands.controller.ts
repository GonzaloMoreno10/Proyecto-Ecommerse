import { brandsRepository } from '../repositories/brands.repository';
import { Request, Response } from 'express';
import { INewBrand } from '../interface/brand.model';
import { constructResponse } from '../utils/constructResponse';
class MarcasController {
  async getMarcas(req: Request, res: Response) {
    try {
      const result = await brandsRepository.getBrands();
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
      return constructResponse(500, res);
    }
  }

  async getMarcasByCategory(req: Request, res: Response) {
    try {
      const { BraCatId } = req.params;
      const result = await brandsRepository.getBrandsByCategoryId(parseInt(BraCatId));
      return constructResponse(121, res, result);
    } catch (err) {
      return constructResponse(500, res);
    }
  }

  async getBrandsById(req: Request, res: Response) {
    try {
      const { BraId } = req.params;
      const result = await brandsRepository.getBrandsById(parseInt(BraId));
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
      const result = await brandsRepository.setBrand(brand);
      return constructResponse(121, res, result);
    } catch (err) {
      console.log(err);
      return constructResponse(500, res);
    }
  }
}

export const marcasController = new MarcasController();
