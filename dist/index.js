"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./services/server"));
//Inicializacion
//Listen
server_1.default.listen(server_1.default.get('port'), () => {
    console.log('Servidor corriendo en puerto ' + server_1.default.get('port'));
});
