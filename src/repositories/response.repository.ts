import { Op } from 'sequelize';
import { ResponseModel } from '../datasource/sequelize';
import { IResponses } from '../interface/responses.interface';

class ResponseRepository {
  async getByResIds(resId: number | number[]): Promise<IResponses[]> {
    return await ResponseModel.findAll({
      where: {
        resId: {
          [Op.or]: Array.isArray(resId) ? resId : [resId],
        },
      },
    });
  }
}

export const responseRepository = new ResponseRepository();
