import app from './services/server';
import minimist from 'minimist';
import cluster from 'cluster';
import os from 'os';
import log4js from 'log4js';
//Inicializacion
const argumentos = minimist(process.argv.slice(2));
const clusterMode = argumentos.cluster;
const numCPUs = os.cpus().length;
const consoleLogger = log4js.getLogger('consoleLogger');

//Server
if (clusterMode && cluster.isMaster) {
  consoleLogger.info('Ejecutando modo cluster');
  consoleLogger.info(`PID MASTER ${process.pid}`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', worker => {
    consoleLogger.info(`Worker ${worker.process.pid} died at ${Date()}`);
    cluster.fork();
  });
} else {
  app.listen(app.get('port'), () =>
    consoleLogger.info(`Servidor express escuchando en el puerto ${app.get('port')} - PID WORKER ${process.pid}`)
  );
}
