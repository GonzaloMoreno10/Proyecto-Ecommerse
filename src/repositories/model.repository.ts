import { model } from 'mongoose';
import { ModelModel } from '../datasource/sequelize';
import { INewModel } from '../interface/model.interface';
import { mysqlDataSource } from '../services/mysql.service';

class ModeloRepository {
  private connection = mysqlDataSource.connection();

  async getModelos() {
    return await ModelModel.findAll({ where: { enabled: true } });
  }

  async getModelosById(ModId: number) {
    return await ModelModel.findOne({ where: { ModId, enabled: true } });
  }

  async getModelosByMarca(ModBraId: number) {
    return await ModelModel.findAll({ where: { ModBraId } });
  }

  async createModel(modelo: INewModel) {
    return await ModelModel.create(modelo);
  }
}

export const modeloRepository = new ModeloRepository();
