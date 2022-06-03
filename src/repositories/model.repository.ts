import { ModelModel } from '../datasource/sequelize';
import { IModel, IModelFilter, INewModel } from '../interface/model.interface';

class ModelRepository {
  async get(filter?: Partial<IModelFilter>): Promise<IModel[]> {
    if (filter) {
      const whereClause: Partial<IModelFilter> = { enabled: true };
      if (filter.ModBraId) {
        whereClause.ModBraId = filter.ModBraId;
      }
      if (filter.ModName) {
        whereClause.ModName = filter.ModName;
      }
      if (filter.createdUser) {
        whereClause.createdUser = filter.createdUser;
      }
      return await ModelModel.findAll({ where: whereClause });
    }
    return await ModelModel.findAll({ where: { enabled: true } });
  }

  async getById(ModId: number): Promise<IModel> {
    return await ModelModel.findOne({ where: { ModId, enabled: true } });
  }

  async upd(model: IModel, ModId: number) {
    return await ModelModel.update(model, { where: { ModId, enabled: true } });
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
