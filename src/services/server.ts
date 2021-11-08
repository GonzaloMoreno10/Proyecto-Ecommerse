import express from 'express';
import mainRouter from '../routes/main.route';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

//Configuracion
app.set('port', process.env.PORT);

//Middlewares

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api', mainRouter);

export default app;
