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
const path = __importStar(require("path"));
const main_route_1 = __importDefault(require("../routes/main.route"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_session_1 = __importDefault(require("express-session"));
const session_1 = require("../config/session");
const passport_1 = __importDefault(require("passport"));
const express_handlebars_1 = __importDefault(require("express-handlebars"));
const allow_prototype_access_1 = require("@handlebars/allow-prototype-access");
const handlebars_1 = __importDefault(require("handlebars"));
const connect_flash_1 = __importDefault(require("connect-flash"));
const log4js_1 = __importDefault(require("log4js"));
const log4js_2 = require("../config/log4js");
log4js_1.default.configure(log4js_2.log4jsConfig);
require('../services/passport');
dotenv_1.default.config();
const app = (0, express_1.default)();
//Configuracion
app.set('port', process.env.PORT);
//Middlewares
app.use((0, express_session_1.default)(session_1.StoreOptions));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use((0, connect_flash_1.default)());
app.use(express_1.default.static(path.resolve(__dirname, '../../public')));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.redirect('/api/productos');
});
//Engine
app.set('views', path.resolve(__dirname, '../../src/views'));
app.engine('.hbs', (0, express_handlebars_1.default)({
    //Configuro handlebars
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    handlebars: (0, allow_prototype_access_1.allowInsecurePrototypeAccess)(handlebars_1.default),
}));
app.use((req, res, next) => {
    res.locals.user = req.user || undefined;
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});
app.set('view engine', '.hbs');
app.use('/api', main_route_1.default);
exports.default = app;
