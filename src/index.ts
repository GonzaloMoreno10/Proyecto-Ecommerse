import express from "express";
import mainRouter from './routes/main.route'

//Inicializacion
const app = express();

//Configuracion
app.set('port',process.env.PORT||8080);

//Middlewares sdfdsfsdfsd

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api',mainRouter);


//Listen

let server = app.listen(app.get('port'),()=>{
    console.log("Servidor corriendo en puerto " + app.get('port'))
});


