"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const carritoSchema = new mongoose_1.Schema({
    userId: Object,
    timestamp: Date,
    productos: [Object],
});
exports.default = (0, mongoose_1.model)('carritos', carritoSchema);
