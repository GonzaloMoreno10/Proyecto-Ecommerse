import { Request, Response } from 'express';
import { categoryRepository } from '../repositories/category.repository';
import { ICategory, INewCategory } from '../interface/category.interface';
import { constructResponse } from '../utils/constructResponse';
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
