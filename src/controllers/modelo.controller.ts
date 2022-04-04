import { Request, Response } from 'express';
import { mysqlCategoriaRepository } from '../repositories/mysql/categoriaRepository';
import { ICategoria } from '../interface/categoria.interface';
import { modeloRepository } from '../repositories/mysql/modeloRepository';
class ModeloController {
  async get(req: Request, res: Response) {
    const { marcaId } = req.params;
    console.log(marcaId);
    if (!marcaId) {
      let modelos = await modeloRepository.getModelos();
      console.log(modelos);
      return res.status(200).json(modelos);
    } else {
      let modelos = await modeloRepository.getModelosByMarca(parseInt(marcaId));
      return res.status(200).json(modelos);
    }
  }

  async setModelo(req: Request, res: Response) {
    const { marcaId, nombre } = req.body;
    if (!marcaId || !nombre) {
      return res.status(400).json('Invalid body');
    }
    let result = await modeloRepository.createModel({ marcaId, nombre });
    const toReturn = await modeloRepository.getModelosById(Object.assign(result).insertId);
    return res.status(200).json(toReturn);
  }
}

export const modeloController = new ModeloController();
