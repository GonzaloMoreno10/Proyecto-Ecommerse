import Server from './src/services/server';
import mainRouter from './src/routes/main.route'
import { Venv } from './src/constantes/venv';
//Inicializacion

const puerto = Venv.PORT;

//Listen

Server.listen(puerto,()=>{
    console.log("Servidor corriendo en puerto " + puerto)
});


