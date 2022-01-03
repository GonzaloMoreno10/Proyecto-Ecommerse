"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productoSchema = new mongoose_1.Schema({
    nombre: String,
    descripcion: String,
    codigo: Number,
    foto: String,
    precio: Number,
    stock: Number,
    categoria: String,
});
exports.default = (0, mongoose_1.model)('productos', productoSchema);
