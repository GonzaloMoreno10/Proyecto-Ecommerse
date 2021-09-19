import Server from './services/server';
import mainRouter from './routes/main.route'

//Inicializacion

const puerto = process.env.PORT || 8080;

//Listen

Server.listen(puerto,()=>{
    console.log("Servidor corriendo en puerto " + puerto)
});


