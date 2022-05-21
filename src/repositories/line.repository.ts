import { LineModel } from '../datasource/sequelize';
import { ILine, INewLine } from '../interface/line.interface';

class LineRepository {
  async getLines(enabled = true) {
    return await LineModel.findAll({ where: { enabled } });
  }

  async getLineById(LinId: number, enabled = true) {
    const whereClause = {
      LinId: LinId,
      enabled: !enabled ? '' : true,
    };
    const result = await LineModel.findOne({ where: whereClause });
    return result;
  }

  async getLinesByModel(LinModId: number) {
    const result = LineModel.findAll({ where: { LinModId, enabled: true } });
    return result;
  }

  async setLine(line: INewLine) {
    const result = await LineModel.create(line);
    return result;
  }

  async updLine(line: ILine, LinId: number) {
    return await LineModel.update(line, { where: { LinId } });
  }

  async delLine(LinId: number, updatedUser: number) {
    const res = await LineModel.findOne({ where: { LinId, enabled: true } });
    if (res) {
      const lineUpdate = Object.assign(res).dataValues;
      lineUpdate.UpdatedAt = new Date();
      lineUpdate.enabled = false;
      lineUpdate.updatedUser = updatedUser;
      const result = await LineModel.update(lineUpdate, { where: { LinId: lineUpdate.LinId } });
      return result;
    }
  }
}

export const lineRepository = new LineRepository();
