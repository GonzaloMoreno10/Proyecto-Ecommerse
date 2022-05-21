import { ModelModel } from '../datasource/sequelize';
import { IModel, INewModel } from '../interface/model.interface';

class ModelRepository {
  async getModels() {
    return await ModelModel.findAll({ where: { enabled: true } });
  }

  async getModelsById(ModId: number) {
    return await ModelModel.findOne({ where: { ModId, enabled: true } });
  }

  async getModelByBrand(ModBraId: number) {
    return await ModelModel.findAll({ where: { ModBraId } });
  }

  async updModel(model: IModel, ModId: number) {
    return await ModelModel.update(model, { where: { ModId } });
  }

  async delModel(ModId: number, userId: number) {
    const model = await ModelModel.findOne({ where: { ModId }, raw: true });
    if (model) {
      model.enabled = false;
      model.updatedAt = new Date();
      model.updatedUser = userId;

      return await ModelModel.update(model, { where: { ModId } });
    }
  }

  async setModel(modelo: INewModel) {
    return await ModelModel.create(modelo);
  }
}

export const modelRepository = new ModelRepository();
