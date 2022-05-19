"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./services/server"));
const log4js_1 = __importDefault(require("log4js"));
const consoleLogger = log4js_1.default.getLogger('consoleLogger');
server_1.default.listen(process.env.PORT || 8000, () => consoleLogger.info(`Servidor escuchando en el puerto ${process.env.PORT} - PID WORKER ${process.pid}`));
