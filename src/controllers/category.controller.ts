import { Request, Response } from 'express';
import { mysqlCategoriaRepository } from '../repositories/category.repository';
import { ICategory, INewCategory } from '../interface/category.interface';
import { constructResponse } from '../utils/constructResponse';
class CategoriaController {
  async get(req: Request, res: Response) {
    const { id } = req.params;
    let result: ICategory[] | ICategory;
    try {
      if (!id) {
        result = await mysqlCategoriaRepository.getCategorias();
      } else {
        result = await mysqlCategoriaRepository.getCategoriasById(parseInt(id));
      }
      return constructResponse(121, res, result);
    } catch (err) {
      return res.status(400).json(err);
    }
  }

  async getCategoriesByName(req: Request, res: Response) {
    let { CatName } = req.params;
    try {
      let result = await mysqlCategoriaRepository.getCategoriaByNombre(CatName);
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
    let result = await mysqlCategoriaRepository.setCategoria(categoria);
    return constructResponse(121, res, result);
  }
}

export const categoriaController = new CategoriaController();
