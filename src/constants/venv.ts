import dotenv from 'dotenv';

dotenv.config();

export const API_URL = process.env.API_URL;
export const GMAIL_SECRET = process.env.GMAIL_SECRET;
export const MYSQL_PORT = process.env.MYSQL_PORT;
//TOKEN
export const APIKEY = process.env.APIKEY;
export const TOKEN_TIME = process.env.TOKEN_TIME;
export const SECRET_TOKEN_PASSWORD = process.env.SECRET_TOKEN_PASSWORD;
export const JWT_SECRET = process.env.JWT_SECRET;

//API CONFIG
export const PORT = process.env.PORT;
export const HEROKU = process.env.HEROKU;

//MYSQL
export const MYSQL_USER = process.env.MYSQL_USER;
export const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
export const MYSQL_DBNAME = process.env.MYSQL_DBNAME;
export const MYSQL_HOST = process.env.MYSQL_HOST;

//Mail-SMS
export const ADMIN_MAIL = process.env.ADMIN_MAIL;
export const TWILIO_SID = process.env.TWILIO_SID;
export const TWILIO_TOKEN = process.env.TWILIO_TOKEN;
export const ADMIN_CELPHONE = process.env.ADMIN_CELPHONE;
export const TWILIO_ADMIN_WHATSAPP = process.env.TWILIO_ADMIN_WHATSAPP;

//NODEMAILER
export const NODEMAILER_HOST = process.env.NODEMAILER_HOST;
export const NODEMAILER_PORT = process.env.NODEMAILER_PORT;
