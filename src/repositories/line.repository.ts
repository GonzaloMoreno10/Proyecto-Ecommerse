const { Op } = require('sequelize');
import { LineModel } from '../datasource/sequelize';
import { ILine, ILineFilter, INewLine } from '../interface/line.interface';

class LineRepository {
  async get(filters: Partial<ILineFilter>): Promise<ILine[]> {
    const whereClause: Partial<ILineFilter> = { enabled: true };
    if (filters.LinModId) whereClause.LinModId = filters.LinModId;
    if (filters.LinName) whereClause.LinName = { [Op.like]: `%${filters.LinName}%` };
    return await LineModel.findAll({ where: whereClause });
  }

  async getById(LinId: number, enabled = true): Promise<ILine[]> {
    const whereClause = {
      LinId: LinId,
      enabled: !enabled ? '' : true,
    };
    return await LineModel.findAll({ where: whereClause });
  }

  async getByModel(LinModId: number): Promise<ILine[]> {
    return await LineModel.findAll({ where: { LinModId, enabled: true } });
  }

  async set(line: INewLine): Promise<ILine> {
    return await LineModel.create(line);
  }

  async upd(line: ILine, LinId: number) {
    return await LineModel.update(line, { where: { LinId, enabled: true } });
  }

  async del(LinId: number, userId: number) {
    const res = await LineModel.findOne({ where: { LinId, enabled: true }, raw: true });
    if (res) {
      res.deletedAt = new Date();
      res.enabled = false;
      res.deletedUser = userId;
      return await LineModel.update(res, { where: { LinId: res.LinId } });
    }
  }
}

export const lineRepository = new LineRepository();
