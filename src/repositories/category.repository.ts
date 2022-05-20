import { CategoryModel } from '../datasource/sequelize';
import { ICategory, INewCategory } from '../interface/category.interface';
class ProductRepository {
  async getCategorias(): Promise<ICategory[]> {
    const result = CategoryModel.findAll();
    return result;
  }

  async getCategoriasById(id: number): Promise<ICategory> {
    try {
      const result = await CategoryModel.findOne({ where: { CatId: id } });
      return result;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async setCategoria(categoria: INewCategory) {
    const result = CategoryModel.create(categoria);
    return result;
  }

  async getCategoriaByNombre(CatName: string): Promise<ICategory> {
    try {
      const result = await CategoryModel.findOne({ where: { CatName } });
      return result;
    } catch (err) {
      return err;
    }
  }

  async deleteCategoria(id: number) {
    const category = await CategoryModel.findOne({ where: { CatId: id } });
    if (category) {
      category.enabled = false;
    }
    const result = await CategoryModel.update(category, { where: { CatId: id } });
    return result;
  }
}

export const mysqlCategoriaRepository = new ProductRepository();
