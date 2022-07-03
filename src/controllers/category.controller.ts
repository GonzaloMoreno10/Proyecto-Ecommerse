import { Request, Response } from 'express';
import { categoryRepository } from '../repositories/category.repository';
import { ICategory, INewCategory } from '../interface/category.interface';
import { constructResponse } from '../utils/constructResponse';
import { productTypeRepository } from '../repositories/productType.repository';
import { getTokenSourceMapRange } from 'typescript';
class CategoriaController {
  async get(req: Request, res: Response) {
    const { id } = req.params;
    const { CatName } = req.query;
    let result: ICategory[] | ICategory;
    try {
      if (!id) {
        if (CatName) {
          result = await categoryRepository.get(String(CatName));
        } else result = await categoryRepository.get();
      } else {
        result = await categoryRepository.getById(parseInt(id));
      }
      return constructResponse(121, res, result);
    } catch (err) {
      return res.status(400).json(err);
    }
  }

  async del(req: Request, res: Response) {
    const { CatId } = req.params;
    try {
      const existsCat = await categoryRepository.getById(parseInt(CatId));
      if (!existsCat) return constructResponse(123, res);
      const userId = res.locals.userData.userId;
      await categoryRepository.del(parseInt(CatId), userId);
      const pTypes = await productTypeRepository.getByCategory(parseInt(CatId));
      if (pTypes.length > 0) {
        const promises = [];
        for (const i in pTypes) {
          const promise = productTypeRepository.del(pTypes[i].TypId, userId);
          promises.push(promise);
        }
        const result = await Promise.allSettled(promises);
        console.log(result);
      }
      return constructResponse(121, res);
    } catch (err) {
      console.log(err);
      return constructResponse(500, res);
    }
  }

  async set(req: Request, res: Response) {
    const { CatName, image } = req.body;
    if (await categoryRepository.getByName(CatName)) {
      return constructResponse(644, res);
    }
    let categoria: INewCategory = {
      CatName,
      createdUser: res.locals.userData.userId,
    };
    let result = await categoryRepository.set(categoria);
    return constructResponse(121, res, result);
  }
}

export const categoriaController = new CategoriaController();
