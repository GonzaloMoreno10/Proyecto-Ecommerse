"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const types_1 = require("sequelize/types");
exports.sequelize = new types_1.Sequelize('mysql://root:15574529@34.134.179.108:3306/ecommerce');
