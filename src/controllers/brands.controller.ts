import { marcasRepository } from '../repositories/brands.repository';
import { Request, Response } from 'express';
import { INewBrand } from '../interface/brand.model';
class MarcasController {
  async getMarcas(req: Request, res: Response) {
    try {
      const result = await marcasRepository.getBrands();
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
    }
  }

  async getMarcasByProductType(req: Request, res: Response) {
    try {
      const { productType } = req.params;
      const result = await marcasRepository.getBrandsByProductType(parseInt(productType));
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
    }
  }

  async getMarcasByCategory(req: Request, res: Response) {
    try {
      const { categoryId } = req.params;
      const result = await marcasRepository.getBrandsByCategoryId(parseInt(categoryId));
      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }

  async setMarca(req: Request, res: Response) {
    try {
      const { productTypeId, name, img } = req.body;
      if (!productTypeId || !name) {
        return res.status(400).json('Invalid body');
      }
      const brand: INewBrand = {
        BraName: name,
        BraTypId: productTypeId,
        createdUser: res.locals.userData.id,
      };
      const result = await marcasRepository.setBrand(brand);
      const toReturn = await marcasRepository.getBrandsById(Object.assign(result).insertId);
      res.status(200).json(toReturn);
    } catch (err) {
      console.log(err);
    }
  }
}

export const marcasController = new MarcasController();
