import { Request, Response } from 'express';
import { lineasRepository } from '../repositories/line.repository';
class LineaController {
  async get(req: Request, res: Response) {
    const { modeloId } = req.params;
    if (!modeloId) {
      let lineas = await lineasRepository.getLineas();
      return res.status(200).json(lineas);
    } else {
      let lineas = await lineasRepository.getLineasByModelo(parseInt(modeloId));
      return res.status(200).json(lineas);
    }
  }

  async setLinea(req: Request, res: Response) {
    const { modeloId, nombre } = req.body;
    if (!modeloId || !nombre) {
      return res.status(400).json('Invalid body');
    } else {
      try {
        let linea = await lineasRepository.setLinea({ modeloId, nombre });
        const toReturn = await lineasRepository.getLineaById(Object.assign(linea).insertId);
        return res.status(200).json(toReturn);
      } catch (err) {
        console.log(err);
      }
    }
  }
}

export const lineasController = new LineaController();
