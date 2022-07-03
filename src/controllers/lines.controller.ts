import { Request, Response } from 'express';
import { ILine, ILineFilter } from '../interface/line.interface';
import { lineRepository } from '../repositories/line.repository';
import { constructResponse } from '../utils/constructResponse';
class LineaController {
  async getByModel(req: Request, res: Response) {
    const { LinModId } = req.params;
    const lineas = await lineRepository.getByModel(parseInt(LinModId));
    return constructResponse(121, res, lineas);
  }

  async get(req: Request, res: Response) {
    const { LinId } = req.params;
    const filters: Partial<ILineFilter> = req.query;
    let lines: ILine[];
    try {
      if (LinId) {
        lines = await lineRepository.getById(parseInt(LinId));
      } else {
        lines = await lineRepository.get(filters);
      }
      if (lines.length > 0) {
        return constructResponse(121, res, lines);
      }
      return constructResponse(123, res);
    } catch (err) {
      console.log(err);
      constructResponse(500, res);
    }
  }

  async del(req: Request, res: Response) {
    const LinId = parseInt(req.params.LinId);
    try {
      const line = await lineRepository.getById(LinId);
      if (line.length <= 0) {
        return constructResponse(123, res);
      }
      await lineRepository.del(LinId, res.locals.userData.userId);
      const result = await lineRepository.getById(LinId);
      constructResponse(121, res, result);
    } catch (err) {
      return constructResponse(500, res);
    }
  }

  async set(req: Request, res: Response) {
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
