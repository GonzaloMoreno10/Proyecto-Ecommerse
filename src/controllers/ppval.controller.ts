import { Request, Response } from 'express';
import { ProductPropertySubItemModel } from '../datasource/sequelize';
import { INewProductPropertySubItem, IProductPropertySubItem } from '../interface/productPropertySubItem.interface';
import { INewProductPropertyValue, IProductPropertyValue } from '../interface/productPropertyValue.interface';
import { ppsuiRepository } from '../repositories/ppsui.repository';
import { ppvalRepository } from '../repositories/ppval.repository';
import { constructResponse } from '../utils/constructResponse';

class PpvalController {
  async get(req: Request, res: Response) {
    const { ValId } = req.params;
    let result: IProductPropertyValue[] | IProductPropertyValue;
    try {
      if (ValId) {
        result = await ppvalRepository.getById(parseInt(ValId));
      } else {
        result = await ppvalRepository.get();
      }
      return constructResponse(121, res, result);
    } catch (err) {
      return constructResponse(500, res, err);
    }
  }

  async del(req: Request, res: Response) {
    const { ValId } = req.params;
    try {
      await ppvalRepository.del(parseInt(ValId), res.locals.userData.userId);
      return constructResponse(121, res);
    } catch (err) {
      return constructResponse(500, res, err);
    }
  }

  async set(_, res: Response) {
    const ppval: INewProductPropertyValue[] = res.locals.newPpval;
    console.log(ppval);
    const result = [];
    try {
      for (const i in ppval) {
        result.push(await ppvalRepository.set(ppval[i]));
      }
      return constructResponse(121, res, result);
    } catch (err) {
      return constructResponse(500, res, undefined, err);
    }
  }
}
export const ppvalController = new PpvalController();
