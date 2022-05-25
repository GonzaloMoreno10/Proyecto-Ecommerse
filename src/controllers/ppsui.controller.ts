import { Request, Response } from 'express';
import { ProductPropertySubItemModel } from '../datasource/sequelize';
import { INewProductPropertySubItem, IProductPropertySubItem } from '../interface/productPropertySubItem.interface';
import { ppsuiRepository } from '../repositories/ppsui.repository';
import { constructResponse } from '../utils/constructResponse';

class PpsuiController {
  async get(req: Request, res: Response) {
    const { SuiId } = req.params;
    let result: IProductPropertySubItem[] | IProductPropertySubItem;
    try {
      if (SuiId) {
        result = await ppsuiRepository.getById(parseInt(SuiId));
      } else {
        result = await ppsuiRepository.get();
      }
      return constructResponse(121, res, result);
    } catch (err) {
      return constructResponse(500, res, err);
    }
  }

  async del(req: Request, res: Response) {
    const { SuiId } = req.params;
    try {
      await ppsuiRepository.del(parseInt(SuiId), res.locals.userData.userId);
      return constructResponse(121, res);
    } catch (err) {
      return constructResponse(500, res, err);
    }
  }

  async set(_, res: Response) {
    const ppsui: INewProductPropertySubItem[] = res.locals.newPpsui;
    console.log(ppsui);
    const result = [];
    try {
      for (const i in ppsui) {
        result.push(await ppsuiRepository.set(ppsui[i]));
      }
      return constructResponse(121, res, result);
    } catch (err) {
      return constructResponse(500, res, err);
    }
  }
}
export const ppsuiController = new PpsuiController();
