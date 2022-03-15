import mongoose, { Schema } from 'mongoose';

import { ICategoria } from '../../interface/categoria.interface';

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

  async getCategoriasById(id: string) {
    return await this.categorias.findById(id);
  }

  async createCategoria(categoria: ICategoria) {
    const res = await this.categorias.create(categoria);
    return res;
  }
}

export const categoriaRepository = new CategoriaRepository();
