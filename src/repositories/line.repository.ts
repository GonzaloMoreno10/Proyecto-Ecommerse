import { LineModel } from '../datasource/sequelize';
import { ILine, INewLine } from '../interface/line.interface';

class LineRepository {
  async get(enabled = true): Promise<ILine[]> {
    return await LineModel.findAll({ where: { enabled } });
  }

  async getById(LinId: number, enabled = true): Promise<ILine> {
    const whereClause = {
      LinId: LinId,
      enabled: !enabled ? '' : true,
    };
    return await LineModel.findOne({ where: whereClause });
  }

  async getByModel(LinModId: number): Promise<ILine[]> {
    return await LineModel.findAll({ where: { LinModId, enabled: true } });
  }

  async set(line: INewLine): Promise<ILine> {
    return await LineModel.create(line);
  }

  async upd(line: ILine, LinId: number) {
    return await LineModel.update(line, { where: { LinId } });
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
