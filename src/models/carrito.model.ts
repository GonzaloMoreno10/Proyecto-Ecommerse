import { Producto } from './producto.model';

export class Carrito {
  userId: number;
  id: number;
  timestamp: Date;
  productos: Array<Producto>;

  constructor(id: number, timestamp: Date, productos: Array<Producto>, userId: number) {
    this.userId = userId;
    this.id = id;
    this.timestamp = timestamp;
    this.productos = productos;
  }
}
