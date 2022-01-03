import { Schema, model } from 'mongoose';
import { Orden } from '../interface/orden.interface';

const orderSchema = new Schema({
  items: [
    {
      prodId: Object,
      nombre: String,
      precio: Number,
      stock: Number,
      codigo: Number,
      foto: String,
      descripcion: String,
      cantidad: Number,
      precioTotal: Number,
    },
  ],
  nroOrden: Number,
  timestamp: Date,
  estado: Number,
  email: String,
  userId: String,
  precioOrden: Number,
});

export default model<Orden>('orders', orderSchema);
