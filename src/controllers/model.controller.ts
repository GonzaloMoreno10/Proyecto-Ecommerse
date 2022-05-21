import { Request, Response } from 'express';
import { modelRepository } from '../repositories/model.repository';
import { constructResponse } from '../utils/constructResponse';
class ModeloController {
  async get(req: Request, res: Response) {
    const { marcaId } = req.params;
    if (!marcaId) {
      let modelos = await modelRepository.getModels();
      return res.status(200).json(modelos);
    } else {
      let modelos = await modelRepository.getModelByBrand(parseInt(marcaId));
      return res.status(200).json(modelos);
    }
  }

  async setModelo(req: Request, res: Response) {
    const { ModBraId, ModName } = req.body;

    if (!ModBraId || !ModName) {
      return constructResponse(128, res);
    }
    let result = await modelRepository.setModel({ ModBraId, ModName, createdUser: res.locals.userData.userId });
    const toReturn = await modelRepository.getModelsById(Object.assign(result).insertId);
    return res.status(200).json(toReturn);
  }
}

export const modeloController = new ModeloController();
