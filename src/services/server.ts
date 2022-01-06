import express from 'express';
import http from 'http';
import * as path from 'path';
import mainRouter from '../routes/main.route';
import dotenv from 'dotenv';
import passport from 'passport';
import flash from 'connect-flash';
import log4js from 'log4js';
import { log4jsConfig } from '../config/log4js';
import { initIo } from './socketIo';
import cors from 'cors';
import conexion from '../config/mongoDbConnect';
import { errorHandler } from '../controllers/errors.controller';
import swaggerUI from 'swagger-ui-express';
import docs from '../docs';

log4js.configure(log4jsConfig);
require('../services/passport');

conexion();
dotenv.config();

const app = express();

app.use(cors());

app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(docs));

//Configuracion
app.set('port', process.env.PORT);

app.use(errorHandler);

const pugPath = path.resolve(__dirname, '../views');

app.set('views', pugPath);
//Middlewares

app.use(passport.initialize());

app.use(flash());

app.use(express.static(path.resolve(__dirname, '../../public')));

app.use(express.json({ limit: '50mb' }));

app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.get('/', (req, res) => {
  res.redirect('/api/productos');
});

app.use('/api', mainRouter);

const Server: http.Server = http.createServer(app);
initIo(Server);

export default Server;
