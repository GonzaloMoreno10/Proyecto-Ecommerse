import mongoose, { Schema } from 'mongoose';

import { ICategoria, INewCategoria } from '../../interface/categoria.interface';

const categoriaSchema = new Schema({
  nombre: String,
});

class CategoriaRepository {
  private categorias: any;
  constructor() {
    this.categorias = mongoose.model<ICategoria>('categorias', categoriaSchema);
  }

  async getAllCategorias() {
    return await this.categorias.find();
  }

  async createCategoria(categoria: INewCategoria) {
    const res = await this.categorias.create(categoria);
    return res;
  }
}

export const categoriaRepository = new CategoriaRepository();
