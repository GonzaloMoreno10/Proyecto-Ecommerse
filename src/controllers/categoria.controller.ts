import { Request, Response } from 'express';
import { mysqlCategoriaRepository } from '../repositories/mysql/categoriaRepository';
import { ICategoria } from '../interface/categoria.interface';
class CategoriaController {
  async get(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      let categorias = await mysqlCategoriaRepository.getCategorias();
      return res.status(200).json(categorias);
    } else {
      let categoria = await mysqlCategoriaRepository.getCategoriasById(parseInt(id));
      return res.status(200).json(categoria);
    }
  }

  async create(req: Request, res: Response) {
    let { nombre } = req.body;
    let categoria: ICategoria = {
      nombre: nombre,
    };
    let result = await mysqlCategoriaRepository.setCategoria(categoria);
    return res.status(201).json(result);
  }
}

export const categoriaController = new CategoriaController();
