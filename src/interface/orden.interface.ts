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

export interface IOrder {
  id?: number;
  price: number;
  orderProducts?: IOrderProducts[];
  created_at: Date;
  estado: number;
  userId?: number;
}

export interface IOrderProducts {
  id?: number;
  estado: number;
  orderId: number;
  productId: number;
  quantity: number;
}
