"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    items: [
        {
            prodId: Object,
            nombre: String,
            precio: Number,
            stock: Number,
            codigo: Number,
            foto: String,
            descripcion: String,
            cantidad: Number,
            precioTotal: Number,
        },
    ],
    nroOrden: Number,
    timestamp: Date,
    estado: Number,
    email: String,
    userId: String,
    precioOrden: Number,
});
exports.default = (0, mongoose_1.model)('orders', orderSchema);
