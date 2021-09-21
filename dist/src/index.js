"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./services/server"));
const venv_1 = require("./constantes/venv");
//Inicializacion
const puerto = venv_1.Venv.PORT;
//Listen
server_1.default.listen(puerto, () => {
    console.log("Servidor corriendo en puerto " + puerto);
});
