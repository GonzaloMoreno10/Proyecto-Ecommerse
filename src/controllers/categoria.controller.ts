import { Request, Response } from 'express';
import { orderRepository } from '../repositories/mongo';
import { Orden } from '../interface/orden.interface';
import { categoriaRepository } from '../repositories/mongo/categoria.repository';
import { INewCategoria } from '../interface/categoria.interface';
class CategoriaController {
  async get(req: Request, res: Response) {
    let categorias = await categoriaRepository.getAllCategorias();

    return res.status(200).json(categorias);
  }

  async create(req: Request, res: Response) {
    let { nombre } = req.body;
    console.log(nombre);
    let categoria: INewCategoria = {
      nombre: nombre,
    };
    let result = await categoriaRepository.createCategoria(categoria);
    return res.status(201).json(result);
  }
}

export const categoriaController = new CategoriaController();
