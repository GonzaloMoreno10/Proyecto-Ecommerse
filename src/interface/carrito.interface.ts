import { ProductOnCart } from '.';

export interface CarritoInterface {
  userId: string;
  _id: any;
  timestamp: Date;
  productos: ProductOnCart[];
}

export interface NewCarritoInterface {
  userId: string;
  timestamp: Date;
  productos: ProductOnCart[];
}
