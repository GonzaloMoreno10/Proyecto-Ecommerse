"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const path_1 = __importDefault(require("path"));
const venv_1 = require("../constants/venv");
exports.swaggerSpec = {
    definition: {
        openapi: '3.0.0',
        info: { title: 'Node MongoDB Ecommerce API', version: '1.0.0' },
        servers: [
            {
                url: venv_1.API_URL,
            },
        ],
    },
    apis: [`${path_1.default.resolve(__dirname, '../routes/*.js')}`],
};
