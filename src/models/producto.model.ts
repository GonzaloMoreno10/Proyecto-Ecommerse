import { Schema, model } from 'mongoose';
import { ProductInterface } from '../interface';

const productoSchema = new Schema({
  nombre: String,
  descripcion: String,
  codigo: Number,
  foto: String,
  precio: Number,
  stock: Number,
  categoria: String,
});

export default model<ProductInterface>('productos', productoSchema);
