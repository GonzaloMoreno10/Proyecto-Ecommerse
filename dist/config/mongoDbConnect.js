"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const venv_1 = require("../constantes/venv");
function connect(arg) {
    arg = `mongodb+srv://${venv_1.MONGO_ATLAS_USER}:${venv_1.MONGO_ATLAS_PASSWORD}@cluster0.6d6g8.mongodb.net/ecommerce?retryWrites=true&w=majority`;
    console.log(arg);
    mongoose_1.default.connect(arg);
}
exports.default = connect;
