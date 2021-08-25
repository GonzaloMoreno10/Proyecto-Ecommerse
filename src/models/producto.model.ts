export class Producto {
  id: number;
  timestamp: Date;
  nombre: string;
  descripcion: string;
  codigo: number;
  foto: string;
  precio: number;
  stock: number;
  idCarrito:number|undefined

  constructor(
    id:number,
    timestamp: Date,
    nombre: string,
    descripcion: string,
    codigo: number,
    foto: string,
    precio: number,
    stock: number,
    idCarrito:number|undefined
  ) {
    this.id = id;
    this.timestamp = timestamp;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.codigo = codigo;
    this.foto = foto;
    this.precio = precio;
    this.stock = stock;
    this.idCarrito = idCarrito
  }
}
