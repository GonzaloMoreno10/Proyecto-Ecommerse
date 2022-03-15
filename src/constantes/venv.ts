import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT;
export const MYSQL_USER = process.env.MYSQL_USER;
export const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
export const MYSQL_DBNAME = process.env.MYSQL_DBNAME;
export const MYSQL_HOST = process.env.MYSQL_HOST;
export const MONGO_USER = process.env.MONGO_USER;
export const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
export const MONGO_DB = process.env.MONGO_DB;
export const MONGO_ATLAS_USER = process.env.MONGO_ATLAS_USER;
export const MONGO_ATLAS_PASSWORD = process.env.MONGO_ATLAS_PASSWORD;
export const MONGO_ATLAS_DB = process.env.MONGO_ATLAS_DB;
export const MONGO_ATLAS_CLUSTER = process.env.MONGO_ATLAS_CLUSTER;
export const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID;
export const FIREBASE_PRIVATE_KEY = process.env.FIREBASE_PRIVATE_KEY;
export const FIREBASE_CLIENT_EMAIL = process.env.FIREBASE_CLIENT_EMAIL;
export const ADMIN_MAIL = process.env.ADMIN_MAIL;
export const TWILIO_SID = process.env.TWILIO_SID;
export const TWILIO_TOKEN = process.env.TWILIO_TOKEN;
export const ADMIN_CELPHONE = process.env.ADMIN_CELPHONE;
export const TWILIO_ADMIN_WHATSAPP = process.env.TWILIO_ADMIN_WHATSAPP;
export const HEROKU = process.env.HEROKU;
