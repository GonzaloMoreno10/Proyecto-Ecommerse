import { ProductOnCart } from '.';

export interface Orden {
  items: any[];
  nroOrden: number;
  timestamp: Date;
  estado: number;
  email: string;
  userId: string;
  precioOrden: number;
}
