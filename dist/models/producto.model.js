"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Producto = void 0;
class Producto {
    constructor(nombre, descripcion, codigo, foto, precio, stock, idCarrito, id) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.codigo = codigo;
        this.foto = foto;
        this.precio = precio;
        this.stock = stock;
        this.idCarrito = idCarrito;
    }
}
exports.Producto = Producto;
