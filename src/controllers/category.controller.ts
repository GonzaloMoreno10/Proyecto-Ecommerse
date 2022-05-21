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
        result = await categoryRepository.getCategories();
      } else {
        result = await categoryRepository.getCategoryById(parseInt(id));
      }
      return constructResponse(121, res, result);
    } catch (err) {
      return res.status(400).json(err);
    }
  }

  async getCategoriesByName(req: Request, res: Response) {
    let { CatName } = req.params;
    try {
      let result = await categoryRepository.getCategoryByName(CatName);
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
    let result = await categoryRepository.setCategory(categoria);
    return constructResponse(121, res, result);
  }
}

export const categoriaController = new CategoriaController();
