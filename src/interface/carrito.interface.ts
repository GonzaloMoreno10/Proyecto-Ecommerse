import { Producto } from '../models';
import { ProductInterface } from './producto.inteface';

export interface CarritoInterface {
  userId: string;
  _id: any;
  timestamp: Date;
  productos: any[];
}

export interface NewCarritoInterface {
  userId: string;
  timestamp: Date;
  productos: any[];
}
