"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const path = __importStar(require("path"));
const main_route_1 = __importDefault(require("../routes/main.route"));
const dotenv_1 = __importDefault(require("dotenv"));
const passport_1 = __importDefault(require("passport"));
const connect_flash_1 = __importDefault(require("connect-flash"));
const log4js_1 = __importDefault(require("log4js"));
const log4js_2 = require("../config/log4js");
const socketIo_1 = require("./socketIo");
const cors_1 = __importDefault(require("cors"));
const mongoDbConnect_1 = __importDefault(require("../config/mongoDbConnect"));
const errors_controller_1 = require("../controllers/errors.controller");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_1 = require("../config/swagger");
log4js_1.default.configure(log4js_2.log4jsConfig);
require('../services/passport');
(0, mongoDbConnect_1.default)();
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use('/api-doc', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup((0, swagger_jsdoc_1.default)(swagger_1.swaggerSpec)));
//Configuracion
app.set('port', process.env.PORT);
app.use(errors_controller_1.errorHandler);
const pugPath = path.resolve(__dirname, '../views');
app.set('views', pugPath);
//Middlewares
app.use(passport_1.default.initialize());
app.use((0, connect_flash_1.default)());
app.use(express_1.default.static(path.resolve(__dirname, '../../public')));
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '50mb' }));
app.get('/', (req, res) => {
    res.redirect('/api/productos');
});
app.use('/api', main_route_1.default);
const Server = http_1.default.createServer(app);
(0, socketIo_1.initIo)(Server);
exports.default = Server;
