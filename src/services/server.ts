import express, { NextFunction } from 'express';
import * as path from 'path';
import mainRouter from '../routes/main.route';
import dotenv from 'dotenv';
import session from 'express-session';
import { StoreOptions } from '../config/session';
import passport from 'passport';
import exphbs from 'express-handlebars';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
import Handlebars from 'handlebars';
import flash from 'connect-flash';
import log4js from 'log4js';
import { log4jsConfig } from '../config/log4js';

log4js.configure(log4jsConfig);
require('../services/passport');
dotenv.config();

const app = express();

//Configuracion
app.set('port', process.env.PORT);

//Middlewares

app.use(session(StoreOptions));

app.use(passport.initialize());

app.use(passport.session());

app.use(flash());

app.use(express.static(path.resolve(__dirname, '../../public')));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.redirect('/api/productos');
});

//Engine

app.set('views', path.resolve(__dirname, '../../src/views'));

app.engine(
  '.hbs',
  exphbs({
    //Configuro handlebars
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);

app.use((req, res, next: NextFunction) => {
  res.locals.user = req.user || undefined;
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.set('view engine', '.hbs');

app.use('/api', mainRouter);

export default app;
