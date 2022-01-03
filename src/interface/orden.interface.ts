import { ProductOnCart } from '.';

export interface Orden {
  items: ProductOnCart[];
  nroOrden: number;
  timestamp: Date;
  estado: number;
  email: string;
  userId: string;
  precioOrden: number;
}
