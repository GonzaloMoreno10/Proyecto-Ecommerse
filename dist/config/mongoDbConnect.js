"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const venv_1 = require("../constantes/venv");
const minimist_1 = __importDefault(require("minimist"));
const log4js_1 = __importDefault(require("log4js"));
function connect() {
    console.log('Entre aca');
    const consoleLogger = log4js_1.default.getLogger('consoleLogger');
    const argumentos = (0, minimist_1.default)(process.argv.slice(2));
    console.log(argumentos);
    if (argumentos.local) {
        console.log('entre en local');
        mongoose_1.default.connect('mongodb://localhost/ecommerce');
        consoleLogger.info('Conectado a base de datos mongo local');
    }
    else {
        const arg = `mongodb+srv://${venv_1.MONGO_ATLAS_USER}:${venv_1.MONGO_ATLAS_PASSWORD}@cluster0.6d6g8.mongodb.net/ecommerce?retryWrites=true&w=majority`;
        mongoose_1.default.connect(arg);
        consoleLogger.info('Conectado a base de datos mongo Atlas');
    }
}
exports.default = connect;
