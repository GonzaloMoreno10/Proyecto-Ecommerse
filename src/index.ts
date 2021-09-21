import Server from './services/server';
import mainRouter from './routes/main.route'
import { Venv } from './constantes/venv';
//Inicializacion

const puerto = Venv.PORT;

//Listen

Server.listen(puerto,()=>{
    console.log("Servidor corriendo en puerto " + puerto)
});


