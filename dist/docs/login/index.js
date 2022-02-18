"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const login_1 = __importDefault(require("./login"));
const logout_1 = __importDefault(require("./logout"));
exports.default = {
    '/auth/login': Object.assign({}, login_1.default),
    // '/auth/signup': {
    //   ...signup,
    // },
    '/auth/logout': Object.assign({}, logout_1.default),
    // '/auth/userdata': {
    //   ...userData,
    // },
};
