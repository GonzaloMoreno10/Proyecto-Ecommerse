import express, { ErrorRequestHandler } from 'express';
import mainRouter from '../routes/main.route'
import * as http from 'http'

const app = express();

//Configuracion
app.set('port',process.env.PORT||8080);

//Middlewares sdfdsfsdfsd

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api',mainRouter);


const errorHandler: ErrorRequestHandler = (err,req,res,next)=>{
    console.log('Hubo un error ' + err);
    res.status(500).json({
        err:err.message
    })
}

app.use(errorHandler)

const Server = new http.Server(app)
export default Server;