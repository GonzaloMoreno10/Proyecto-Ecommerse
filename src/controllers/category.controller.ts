import { Request, Response } from 'express';
import { mysqlCategoriaRepository } from '../repositories/category.repository';
import { ICategory, INewCategory } from '../interface/category.interface';
class CategoriaController {
  async get(req: Request, res: Response) {
    const { id } = req.params;
    try {
      if (!id) {
        let categorias = await mysqlCategoriaRepository.getCategorias();
        return res.status(200).json(categorias);
      } else {
        let categoria = await mysqlCategoriaRepository.getCategoriasById(parseInt(id));
        return res.status(200).json(categoria);
      }
    } catch (err) {
      return res.status(400).json(err);
    }
  }

  async getCategoriesByName(req: Request, res: Response) {
    let { nombre } = req.params;
    if (!nombre) {
      return res.status(400).json({ msg: 'Invalid body' });
    }
    try {
      let result = await mysqlCategoriaRepository.getCategoriaByNombre(nombre);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json({ msg: err });
    }
  }

  async create(req: Request, res: Response) {
    let { nombre, image } = req.body;
    let categoria: INewCategory = {
      CatName: nombre,
      createdUser: res.locals.userData.id,
    };
    let result = await mysqlCategoriaRepository.setCategoria(categoria);
    return res.status(201).json(result);
  }
}

export const categoriaController = new CategoriaController();
