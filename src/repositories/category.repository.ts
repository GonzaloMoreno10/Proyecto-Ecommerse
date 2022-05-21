import { CategoryModel } from '../datasource/sequelize';
import { ICategory, INewCategory } from '../interface/category.interface';
class CategoryRepository {
  async getCategories(): Promise<ICategory[]> {
    const result = CategoryModel.findAll();
    return result;
  }

  async getCategoryById(id: number): Promise<ICategory> {
    try {
      const result = await CategoryModel.findOne({ where: { CatId: id } });
      return result;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async setCategory(categoria: INewCategory) {
    const result = CategoryModel.create(categoria);
    return result;
  }

  async getCategoryByName(CatName: string): Promise<ICategory> {
    try {
      const result = await CategoryModel.findOne({ where: { CatName } });
      return result;
    } catch (err) {
      return err;
    }
  }

  async delCategory(id: number) {
    const category = await CategoryModel.findOne({ where: { CatId: id } });
    if (category) {
      category.enabled = false;
    }
    const result = await CategoryModel.update(category, { where: { CatId: id } });
    return result;
  }

  async updCategory(category: ICategory, CatId: number) {
    return await CategoryModel.update(category, { where: { CatId } });
  }
}

export const categoryRepository = new CategoryRepository();
