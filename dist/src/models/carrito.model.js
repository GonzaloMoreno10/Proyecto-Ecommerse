"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Carrito = void 0;
class Carrito {
    constructor(id, timestamp, productos) {
        this.id = id;
        this.timestamp = timestamp;
        this.productos = productos;
    }
}
exports.Carrito = Carrito;