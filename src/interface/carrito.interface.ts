import { Producto } from '../models';
import { ProductInterface } from './producto.inteface';

export interface CarritoInterface {
  id: any;
  timestamp: Date;
  productos: ProductInterface[];
}
