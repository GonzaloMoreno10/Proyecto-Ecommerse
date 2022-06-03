import { Request, Response } from 'express';
import { categoryRepository } from '../repositories/category.repository';
import { ICategory, INewCategory } from '../interface/category.interface';
import { constructResponse } from '../utils/constructResponse';
class CategoriaController {
  async get(req: Request, res: Response) {
    const { id } = req.params;
    let result: ICategory[] | ICategory;
    try {
      if (!id) {
        result = await categoryRepository.get();
      } else {
        result = await categoryRepository.getById(parseInt(id));
      }
      return constructResponse(121, res, result);
    } catch (err) {
      return res.status(400).json(err);
    }
  }

  async getByName(req: Request, res: Response) {
    let { CatName } = req.params;
    try {
      let result = await categoryRepository.getByName(CatName);
      return constructResponse(121, res, result);
    } catch (err) {
      return constructResponse(500, res);
    }
  }

  async create(req: Request, res: Response) {
    const { CatName, image } = req.body;
    let categoria: INewCategory = {
      CatName,
      createdUser: res.locals.userData.userId,
    };
    let result = await categoryRepository.set(categoria);
    return constructResponse(121, res, result);
  }
}

export const categoriaController = new CategoriaController();
