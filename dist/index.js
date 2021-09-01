"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const main_route_1 = __importDefault(require("./routes/main.route"));
//Inicializacion
const app = express_1.default();
//Configuracion
app.set('port', process.env.PORT || 8080);
//Middlewares sdfdsfsdfsd
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api', main_route_1.default);
//Listen
let server = app.listen(app.get('port'), () => {
    console.log("Servidor corriendo en puerto " + app.get('port'));
});
