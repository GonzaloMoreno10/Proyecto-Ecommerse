import { Request, Response } from 'express';
import { modeloRepository } from '../repositories/model.repository';
import { constructResponse } from '../utils/constructResponse';
class ModeloController {
  async get(req: Request, res: Response) {
    const { marcaId } = req.params;
    if (!marcaId) {
      let modelos = await modeloRepository.getModelos();
      return res.status(200).json(modelos);
    } else {
      let modelos = await modeloRepository.getModelosByMarca(parseInt(marcaId));
      return res.status(200).json(modelos);
    }
  }

  async setModelo(req: Request, res: Response) {
    const { ModBraId, ModName } = req.body;

    if (!ModBraId || !ModName) {
      return constructResponse(128, res);
    }
    let result = await modeloRepository.createModel({ ModBraId, ModName, createdUser: res.locals.userData.userId });
    const toReturn = await modeloRepository.getModelosById(Object.assign(result).insertId);
    return res.status(200).json(toReturn);
  }
}

export const modeloController = new ModeloController();
