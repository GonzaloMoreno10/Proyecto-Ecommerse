"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const basicInfo_1 = __importDefault(require("./basicInfo"));
const cart_1 = __importDefault(require("./cart"));
const chat_1 = __importDefault(require("./chat"));
const components_1 = __importDefault(require("./components"));
const login_1 = __importDefault(require("./login"));
const orders_1 = __importDefault(require("./orders"));
const products_1 = __importDefault(require("./products"));
const servers_1 = __importDefault(require("./servers"));
const tags_1 = __importDefault(require("./tags"));
const users_1 = __importDefault(require("./users"));
const info_1 = __importDefault(require("./info"));
const categorias_1 = __importDefault(require("./categorias"));
exports.default = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, basicInfo_1.default), servers_1.default), tags_1.default), components_1.default), { paths: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, products_1.default), cart_1.default), login_1.default), users_1.default), orders_1.default), chat_1.default), info_1.default), categorias_1.default) });
