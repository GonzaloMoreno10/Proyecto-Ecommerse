"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const producto_controller_1 = __importDefault(require("./controllers/producto.controller"));
const carrito_controller_1 = __importDefault(require("./controllers/carrito.controller"));
//Inicializacion
const app = express_1.default();
//Configuracion
app.set('port', process.env.PORT || 8080);
//Middlewares sdfdsfsdfsd
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/productos', producto_controller_1.default);
app.use('/carrito', carrito_controller_1.default);
//Listen
let server = app.listen(app.get('port'), () => {
    console.log("Servidor corriendo en puerto " + app.get('port'));
});
