import mongoose from 'mongoose';
import { MONGO_ATLAS_PASSWORD, MONGO_ATLAS_USER } from '../constantes/venv';
import minimist from 'minimist';
import log4js from 'log4js';
export default function connect() {
  console.log('Entre aca');
  const consoleLogger = log4js.getLogger('consoleLogger');
  const argumentos = minimist(process.argv.slice(2));
  console.log(argumentos);
  if (argumentos.local) {
    console.log('entre en local');
    mongoose.connect('mongodb://localhost/ecommerce');
    consoleLogger.info('Conectado a base de datos mongo local');
  } else {
    const arg = `mongodb+srv://${MONGO_ATLAS_USER}:${MONGO_ATLAS_PASSWORD}@cluster0.6d6g8.mongodb.net/ecommerce?retryWrites=true&w=majority`;
    mongoose.connect(arg);
    consoleLogger.info('Conectado a base de datos mongo Atlas');
  }
}
