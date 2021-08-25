"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Carrito = void 0;
class Carrito {
    constructor(id, timestamp, productos) {
        this.id = id;
        this.timestamp = timestamp;
        this.productos = productos;
    }
    agregarProducto(prod) {
        this.productos.push(prod);
    }
}
exports.Carrito = Carrito;
