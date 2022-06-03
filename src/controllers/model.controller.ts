import { Request, Response } from 'express';
import { IModel, IModelFilter } from '../interface/model.interface';
import { modelRepository } from '../repositories/model.repository';
import { constructResponse } from '../utils/constructResponse';
class ModeloController {
  async get(req: Request, res: Response) {
    const { MoId } = req.params;
    const filter: Partial<IModelFilter> = req.query;
    let models: IModel | IModel[];
    try {
      if (!MoId) {
        models = await modelRepository.get(filter);
      } else {
        models = await modelRepository.get({ ModBraId: parseInt(MoId) });
      }
      if (models.length > 0) {
        return constructResponse(121, res, models);
      }
      return constructResponse(123, res);
    } catch (err) {
      return constructResponse(500, res, undefined, err);
    }
  }

  async del(req: Request, res: Response) {
    const { ModId } = req.params;
    const userId = res.locals.userData.userId;
    try {
      const mod = await modelRepository.getById(parseInt(ModId));
      if (!mod) {
        return constructResponse(123, res);
      }
      await modelRepository.del(parseInt(ModId), userId);
      return constructResponse(121, res);
    } catch (err) {
      return constructResponse(500, res, err);
    }
  }

  async set(_, res: Response) {
    const model = res.locals.newModel;
    try {
      let result = await modelRepository.set(model);
      return constructResponse(121, res, result);
    } catch (err) {
      return constructResponse(500, res, undefined, err);
    }
  }
}

export const modeloController = new ModeloController();
