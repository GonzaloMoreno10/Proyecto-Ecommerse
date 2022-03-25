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
      const { productType, categoryId } = req.params;
      const result = await marcasRepository.getMarcasByProductType(parseInt(productType), parseInt(categoryId));
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
    }
  }
}

export const marcasController = new MarcasController();
