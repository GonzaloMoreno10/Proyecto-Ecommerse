import { marcasRepository } from '../repositories/mysql/marcasRepository';
import { Request, Response } from 'express';
class MarcasController {
  async getMarcas(req: Request, res: Response) {
    try {
      const result = await marcasRepository.getMarcas();
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
    }
  }

  async getMarcasByProductType(req: Request, res: Response) {
    try {
      const { productType } = req.params;
      const result = await marcasRepository.getMarcasByProductType(parseInt(productType));
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
    }
  }

  async setMarca(req: Request, res: Response) {
    try {
      const { productTypeId, nombre } = req.body;
      if (!productTypeId || !nombre) {
        return res.status(400).json('Invalid body');
      }
      const result = await marcasRepository.createMarca({ productTypeId, nombre });
      const toReturn = await marcasRepository.getMarcasById(Object.assign(result).insertId);
      res.status(200).json(toReturn);
    } catch (err) {
      console.log(err);
    }
  }
}

export const marcasController = new MarcasController();
