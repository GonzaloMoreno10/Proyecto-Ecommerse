import { Request, Response } from 'express';
import { ILine } from '../interface/line.interface';
import { lineRepository } from '../repositories/line.repository';
import { constructResponse } from '../utils/constructResponse';
class LineaController {
  async getByModel(req: Request, res: Response) {
    const { LinModId } = req.params;
    const lineas = await lineRepository.getByModel(parseInt(LinModId));
    return constructResponse(121, res, lineas);
  }

  async getLine(req: Request, res: Response) {
    const { LinId } = req.params;
    let result: ILine[] | ILine;
    try {
      if (LinId) {
        result = await lineRepository.getById(parseInt(LinId));
      } else {
        result = await lineRepository.get();
      }
      return constructResponse(121, res, result);
    } catch (err) {
      console.log(err);
      constructResponse(500, res);
    }
  }

  async delLine(req: Request, res: Response) {
    const LinId = parseInt(req.params.LinId);
    try {
      const line = await lineRepository.getById(LinId);
      if (!line) {
        return constructResponse(123, res);
      }
      await lineRepository.del(LinId, res.locals.userData.userId);
      const result = await lineRepository.getById(LinId);
      constructResponse(121, res, result);
    } catch (err) {
      return constructResponse(500, res);
    }
  }

  async setLinea(req: Request, res: Response) {
    const { LinModId, LinName } = req.body;
    const createdUser = res.locals.userData.userId;
    if (!LinModId || !LinName) {
      return res.status(400).json('Invalid body');
    } else {
      try {
        let linea = await lineRepository.set({ LinModId, LinName, createdUser });
        constructResponse(121, res, linea);
      } catch (err) {
        console.log(err);
        constructResponse(500, res);
      }
    }
  }
}

export const lineasController = new LineaController();
