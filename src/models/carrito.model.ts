import { Schema, model } from 'mongoose';
import { CarritoInterface } from '../interface';

const carritoSchema = new Schema({
  userId: Object,
  timestamp: Date,
  productos: [Object],
});

export default model<CarritoInterface>('carritos', carritoSchema);
