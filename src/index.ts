import express from "express";
import productoRouter from "./controllers/producto.controller";
import carritoRouter from "./controllers/carrito.controller";

//Inicializacion
const app = express();

//Configuracion
app.set('port',process.env.PORT||8080);

//Middlewares sdfdsfsdfsd

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/productos',productoRouter);

app.use('/carrito',carritoRouter);

//Listen

let server = app.listen(app.get('port'),()=>{
    console.log("Servidor corriendo en puerto " + app.get('port'))
});


