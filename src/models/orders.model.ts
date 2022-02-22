import { Schema, model } from 'mongoose';
import { Orden } from '../interface/orden.interface';

const orderSchema = new Schema({
  items: [
    {
      id: Object,
      title: String,
      price: Number,
      stock: Number,
      image: String,
      quantity: Number,
      precioTotal: Number,
      originalStock: Number,
      disaproved: Boolean,
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
