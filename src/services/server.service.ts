import express from 'express';
import http from 'http';
import * as path from 'path';
import mainRouter from '../routes/main.route';
import dotenv from 'dotenv';
import log4js from 'log4js';
import { log4jsConfig } from '../config/log4js.config';
//import { initIo } from './socketIo.service';
import cors from 'cors';
import { errorHandler } from '../controllers/errors.controller';
import swaggerUI from 'swagger-ui-express';
import docs from '../docs';

const app = express();

//Configuracion

log4js.configure(log4jsConfig);

dotenv.config();

app.set('port', process.env.PORT);

app.use(errorHandler);

//Views

const pugPath = path.resolve(__dirname, '../views');

app.set('views', pugPath);

//Middlewares

app.use(cors());

app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(docs));

app.use(express.json({ limit: '50mb' }));

app.use(express.urlencoded({ extended: true }));

app.use('/api', mainRouter);

//SocketIO

const Server: http.Server = http.createServer(app);

//initIo(Server);

export default Server;
