"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const editPicture_1 = __importDefault(require("./editPicture"));
const editUser_1 = __importDefault(require("./editUser"));
const getUser_1 = __importDefault(require("./getUser"));
const getUsers_1 = __importDefault(require("./getUsers"));
const signup_1 = __importDefault(require("./signup"));
exports.default = {
    '/usuarios': Object.assign({}, getUsers_1.default),
    '/usuarios/signup': Object.assign({}, signup_1.default),
    '/usuarios/{id}': Object.assign(Object.assign({}, getUser_1.default), editUser_1.default),
    '/usuarios/editPicture/{userId}': Object.assign({}, editPicture_1.default),
};
