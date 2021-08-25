import { Producto } from "./producto.model";

export class Carrito{
    id:number;
    timestamp:Date;
    productos:Array<Producto>

    constructor(id:number,timestamp:Date,productos:Array<Producto>){
        this.id = id;
        this.timestamp = timestamp;
        this.productos = productos;
    }

    agregarProducto(prod:Producto){
        this.productos.push(prod)
    }
}