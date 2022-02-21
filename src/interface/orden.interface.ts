import { ProductOnCart } from '.';

export interface Orden {
  aproved: any[];
  nroOrden: number;
  timestamp: Date;
  estado: number;
  email: string;
  userId: string;
  precioOrden: number;
  disaproved: any[];
}
