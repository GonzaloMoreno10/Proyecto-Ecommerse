"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getMessages_1 = __importDefault(require("./getMessages"));
exports.default = {
    '/mensajes/{userEmail}': Object.assign({}, getMessages_1.default),
};
