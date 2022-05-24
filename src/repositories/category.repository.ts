import { CategoryModel } from '../datasource/sequelize';
import { ICategory, INewCategory } from '../interface/category.interface';
class CategoryRepository {
  async get(): Promise<ICategory[]> {
    return await CategoryModel.findAll();
  }

  async getById(id: number): Promise<ICategory> {
    return await CategoryModel.findOne({ where: { CatId: id } });
  }

  async set(categoria: INewCategory): Promise<ICategory> {
    return await CategoryModel.create(categoria);
  }

  async getByName(CatName: string): Promise<ICategory> {
    return await CategoryModel.findOne({ where: { CatName } });
  }

  async del(CatId: number, userId: number) {
    const category = await CategoryModel.findOne({ where: { CatId } });
    if (category) {
      category.enabled = false;
      category.deletedAt = new Date();
      category.deletedUser = userId;
    }
    return await CategoryModel.update(category, { where: { CatId } });
  }

  async upd(category: ICategory, CatId: number) {
    return await CategoryModel.update(category, { where: { CatId } });
  }
}

export const categoryRepository = new CategoryRepository();
