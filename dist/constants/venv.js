"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NODEMAILER_PORT = exports.NODEMAILER_HOST = exports.TWILIO_ADMIN_WHATSAPP = exports.ADMIN_CELPHONE = exports.TWILIO_TOKEN = exports.TWILIO_SID = exports.ADMIN_MAIL = exports.MYSQL_HOST = exports.MYSQL_DBNAME = exports.MYSQL_PASSWORD = exports.MYSQL_USER = exports.HEROKU = exports.PORT = exports.JWT_SECRET = exports.SECRET_TOKEN_PASSWORD = exports.TOKEN_TIME = exports.APIKEY = exports.MYSQL_PORT = exports.GMAIL_SECRET = exports.API_URL = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.API_URL = process.env.API_URL;
exports.GMAIL_SECRET = process.env.GMAIL_SECRET;
exports.MYSQL_PORT = process.env.MYSQL_PORT;
//TOKEN
exports.APIKEY = process.env.APIKEY;
exports.TOKEN_TIME = process.env.TOKEN_TIME;
exports.SECRET_TOKEN_PASSWORD = process.env.SECRET_TOKEN_PASSWORD;
exports.JWT_SECRET = process.env.JWT_SECRET;
//API CONFIG
exports.PORT = process.env.PORT;
exports.HEROKU = process.env.HEROKU;
//MYSQL
exports.MYSQL_USER = process.env.MYSQL_USER;
exports.MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
exports.MYSQL_DBNAME = process.env.MYSQL_DBNAME;
exports.MYSQL_HOST = process.env.MYSQL_HOST;
//Mail-SMS
exports.ADMIN_MAIL = process.env.ADMIN_MAIL;
exports.TWILIO_SID = process.env.TWILIO_SID;
exports.TWILIO_TOKEN = process.env.TWILIO_TOKEN;
exports.ADMIN_CELPHONE = process.env.ADMIN_CELPHONE;
exports.TWILIO_ADMIN_WHATSAPP = process.env.TWILIO_ADMIN_WHATSAPP;
//NODEMAILER
exports.NODEMAILER_HOST = process.env.NODEMAILER_HOST;
exports.NODEMAILER_PORT = process.env.NODEMAILER_PORT;
