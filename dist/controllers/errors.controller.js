"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const log4js_1 = __importDefault(require("log4js"));
const consoleLogger = log4js_1.default.getLogger('consoleLogger');
const errorHandler = (err, req, res, next) => {
    const { statusCode, name, message, error, stack, descripcion } = err;
    const errorInfo = {
        error,
        name,
        message,
        stack,
    };
    if (descripcion) {
        errorInfo.descripcion = descripcion;
    }
    consoleLogger.error(`Error: ${error}, Message: ${message}, Stack: ${stack} `);
    res.status(statusCode || 500).json(errorInfo);
};
exports.errorHandler = errorHandler;
