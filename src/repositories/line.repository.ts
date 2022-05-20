import { model } from 'mongoose';
import { LineModel } from '../datasource/sequelize';
import { INewLine } from '../interface/line.interface';
import { mysqlDataSource } from '../services/mysql.service';

class LineaRepository {
  private connection = mysqlDataSource.connection();

  async getLineas(enabled = true) {
    return await LineModel.findAll({ where: { enabled } });
  }

  async getLineaById(LinId: number, enabled = true) {
    const whereClause = {
      LinId: LinId,
      enabled: !enabled ? '' : true,
    };
    const result = await LineModel.findOne({ where: whereClause });
    return result;
  }

  async getLineasByModelo(LinModId: number) {
    const result = LineModel.findAll({ where: { LinModId, enabled: true } });
    return result;
  }

  async setLinea(line: INewLine) {
    const result = await LineModel.create(line);
    return result;
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

export const lineasRepository = new LineaRepository();
