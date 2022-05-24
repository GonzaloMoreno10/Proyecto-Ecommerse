import { ModelModel } from '../datasource/sequelize';
import { IModel, INewModel } from '../interface/model.interface';

class ModelRepository {
  async get(): Promise<IModel[]> {
    return await ModelModel.findAll({ where: { enabled: true } });
  }

  async getById(ModId: number): Promise<IModel> {
    return await ModelModel.findOne({ where: { ModId, enabled: true } });
  }

  async getByBrand(ModBraId: number): Promise<IModel[]> {
    return await ModelModel.findAll({ where: { ModBraId } });
  }

  async upd(model: IModel, ModId: number) {
    return await ModelModel.update(model, { where: { ModId } });
  }

  async del(ModId: number, userId: number) {
    const model = await ModelModel.findOne({ where: { ModId }, raw: true });
    if (model) {
      model.enabled = false;
      model.deletedAt = new Date();
      model.deletedUser = userId;

      return await ModelModel.update(model, { where: { ModId } });
    }
  }

  async set(modelo: INewModel): Promise<IModel> {
    return await ModelModel.create(modelo);
  }
}

export const modelRepository = new ModelRepository();
